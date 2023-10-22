import {
  IsDateString,
  IsNotEmpty,
  IsString,
  IsUUID,
  MinLength,
} from "class-validator";

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  author: string;

  @IsDateString()
  publishedDate: string;
}
