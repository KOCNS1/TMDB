import { IsEmail, IsNotEmpty } from 'class-validator';

export class BasicAuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
