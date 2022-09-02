import { Controller, Get, Body, Patch, Param } from '@nestjs/common';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AccountService } from './services/account.service';

@Controller('accounts')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get()
  findAll() {
    return this.accountService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!isNaN(Number(id))) {
      return this.accountService.findOne(+id, true);
    }
    return this.accountService.findByEmail(id, true);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountService.update(+id, updateAccountDto);
  }
}
