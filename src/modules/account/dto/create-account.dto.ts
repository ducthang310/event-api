import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEmail, IsOptional, IsString } from 'class-validator';
import { AccountStatusEnum } from '../constants';

export class CreateAccountDto {
  @ApiProperty({ example: 'john.smith@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Smith' })
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  verification_code?: string;

  @IsDateString()
  @IsOptional()
  verification_code_created_at?: string;

  @IsDateString()
  @IsOptional()
  verification_code_verified_at?: string;

  @IsOptional()
  status?: AccountStatusEnum;
}
