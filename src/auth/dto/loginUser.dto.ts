import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from "class-validator";

export class LoginDTO {
  @IsEmail()
  @IsNotEmpty({ message: "Email field cannot be empty" })
  email: string;

  @IsNotEmpty({ message: "Password field cannot be empty" })
  password: string;
}
