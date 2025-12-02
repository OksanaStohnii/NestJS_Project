import { IsString, IsInt, Min } from 'class-validator';

export class BookInput {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  @Min(0)
  publishedYear: number;
}
