import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from '../entities/account.entity';
import { Equal, Not, Repository } from 'typeorm';
import { CreateAccountDto } from '../dto/create-account.dto';
import { UpdateAccountDto } from '../dto/update-account.dto';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
  ) {}

  async create(dto: CreateAccountDto): Promise<Account> {
    const { email } = dto;
    const account: Account = await this.findByEmail(email);

    if (account) {
      throw new BadRequestException(`The email (${email}) has already been registered.`);
    }

    return this.accountRepository.save(dto);
  }

  async findAll(): Promise<Account[]> {
    return this.accountRepository.find({});
  }

  async findOne(id: number, reject?: boolean): Promise<Account> {
    const account = await this.accountRepository.findOne({
      where: { id },
    });
    if (!account && reject) {
      throw new NotFoundException('The account does not exist');
    }
    return account;
  }

  async findByEmail(email: string, reject?: boolean): Promise<Account> {
    email = email.toLowerCase().trim();
    const account: Account = await this.accountRepository.findOne({
      where: { email: email },
    });
    if (!account && reject) {
      throw new NotFoundException(`The account (${email}) does not exist`);
    }
    return account;
  }

  async update(id: number, dto: UpdateAccountDto) {
    const account = await this.findOne(id, true);
    if (dto.email) {
      const existingAccount = await this.accountRepository.findOne({
        where: { id: Not(Equal(id)), email: dto.email },
      });
      if (existingAccount) {
        throw new BadRequestException(`The email (${dto.email}) has already been registered.`);
      }
    }
    return this.accountRepository.update({ id: account.id }, dto);
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
