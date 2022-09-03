import { Module } from '@nestjs/common';
import { AccountController } from './account.controller';
import { AccountService } from './services/account.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './entities/account.entity';
import { NameController } from './name.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Account])],
  controllers: [AccountController, NameController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
