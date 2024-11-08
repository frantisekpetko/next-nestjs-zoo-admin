import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4, {
    message: 'Username minimum length not reached',
  })
  @MaxLength(20, {
    message: 'Username maximum length exceeded',
  })
  username: string;

  @IsString()
  @MinLength(8, {
    message: 'Password minimum length not reached',
  })
  @MaxLength(20, {
    message: 'Password maximum length exceeded',
  })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak, must include at least 8 characters, one digit, upper case letter and "non-word" character',
  })
  password: string;
}
