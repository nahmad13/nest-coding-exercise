import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty({ message: "Password field cannot be empty" })
  password: string;
}
