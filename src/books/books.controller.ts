import { Body, Controller, Delete, Param, Post, Put } from '@nestjs/common';
import { BooksService } from './books.service';
import { BookEntity } from './entity/book.entity';
import { Get } from '@nestjs/common';
import { BookInput } from './dto/bookInput.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(): Promise<BookEntity[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BookEntity> {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() input: BookInput): Promise<BookEntity> {
    return this.booksService.create(input);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() input: BookInput) {
    return this.booksService.update(id, input);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.booksService.delete(id);
  }
}
