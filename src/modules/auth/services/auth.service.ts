import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AccountService } from '../../account/services/account.service';
import { ConfigService } from '@nestjs/config';
import { SignUpDto } from '../dto/sign-up.dto';
import { Account } from '../../account/entities/account.entity';
import { JWT_EXPIRES_IN_SECONDS_DEFAULT_VALUE } from '../constants';
import { ResultOfVerification } from '../../account/interfaces';

@Injectable()
export class AuthService {

  constructor(
    private accountService: AccountService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  /**
   * - Check existed account
   * - Generate a verification code
   * - Store the new account info + the verification code
   * - Send the verification code to the phone number
   * - Return the account object ( without verification code )
   * @param dto
   */
  async signUp(dto: SignUpDto) {
    const { email } = dto;
    const account = await this.accountService.create(dto);
    const tokenInfo = await this.sendNotification(email);
    return { account, tokenInfo };
  }

  async sendNotification(
    email: string,
  ): Promise<ResultOfVerification> {
    const account: Account = await this.accountService.findByEmail(email, true);
    const tokenInfo = await this.createVerificationResponse(account);
    // Send Email
    return tokenInfo;
  }

  async createTokenInfo(account: Account): Promise<string> {
    return this.jwtService.signAsync({
      id: account.id,
      email: account.email,
      name: account.name,
    });
  }

  async createVerificationResponse(
    account: Account,
  ): Promise<ResultOfVerification> {
    const token = await this.createTokenInfo(account);
    const expiresInMilliseconds =
      +this.configService.get(
        'JWT_EXPIRES_IN_SECONDS',
        JWT_EXPIRES_IN_SECONDS_DEFAULT_VALUE,
      ) * 1000;
    return {
      account,
      token,
      expiresAt: new Date(
        new Date().getTime() + expiresInMilliseconds,
      ).toISOString(),
    };
  }
}
