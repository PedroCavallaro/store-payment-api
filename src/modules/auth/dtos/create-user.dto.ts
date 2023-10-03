import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @MinLength(8)
  password: string;
  @IsNotEmpty()
  @MinLength(4)
  name: string;
}
