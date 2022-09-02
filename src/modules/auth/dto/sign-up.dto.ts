import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty({ example: 'john.smith@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'John Smith' })
  @IsString()
  name: string;
}
