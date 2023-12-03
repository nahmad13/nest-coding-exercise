import { IsNotEmpty, IsString } from "class-validator";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty({ message: "Task name cannot be empty" })
  name: string;
}
