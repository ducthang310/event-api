import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountService } from './services/account.service';

@Controller('names')
export class NameController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  async findAll(): Promise<string[]> {
    const accounts = await this.accountService.findAll();
    return accounts.map((account) => account.name);
  }
}
