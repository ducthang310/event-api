import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';
import { AccountService } from '../account/services/account.service';
import { AuthService } from './services/auth.service';
import { Account } from '../account/entities/account.entity';
import { SignUpDto } from './dto/sign-up.dto';
import { RequestWithUser } from './interfaces';
import { ResultOfVerification } from '../account/interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    private accountService: AccountService,
    private authService: AuthService,
  ) {}

  @Public()
  @Post('sign-up')
  @ApiOperation({ summary: 'Register a new account' })
  async register(@Body() dto: SignUpDto): Promise<{ account: Account; tokenInfo: ResultOfVerification }> {
    return this.authService.signUp(dto);
  }

  @Get('me')
  @ApiOperation({ summary: 'Get info of the logged account' })
  @ApiResponse({
    status: 200,
    description: '- Details',
  })
  async getAccountInfo(@Req() req: RequestWithUser): Promise<Account> {
    return this.accountService.findByEmail(
        req.user.email.toLowerCase().trim(),
    );
  }
}
