import { IsEmail, IsString, MinLength } from 'class-validator';

export class UserInput {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(4)
  password: string;
}
