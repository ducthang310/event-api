import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class RequestToLogInDto {
  @ApiProperty({ example: 'john.smith@example.com' })
  @IsEmail()
  email: string;
}
