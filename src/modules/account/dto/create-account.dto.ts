import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { AccountStatusEnum } from '../constants';

export class CreateAccountDto {
  @ApiProperty({ example: 'john.smith@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Smith' })
  @IsString()
  name: string;

  @IsOptional()
  status?: AccountStatusEnum;
}
