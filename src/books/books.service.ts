import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './entity/book.entity';
import { BookInput } from './dto/bookInput.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private booksRepo: Repository<BookEntity>,
  ) {}

  findAll(): Promise<BookEntity[]> {
    return this.booksRepo.find();
  }

  async findOne(id: string): Promise<BookEntity> {
    const book = await this.booksRepo.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException('Book not found');
    }

    return book;
  }

  async create(input: BookInput): Promise<BookEntity> {
    const newBook = this.booksRepo.create(input);
    return this.booksRepo.save(newBook);
  }

  async update(id: string, input: BookInput): Promise<BookEntity> {
    const result = await this.booksRepo.update(id, input);

    if (result.affected === 0) {
      throw new NotFoundException('Book not found');
    }

    return this.findOne(id);
  }

  async delete(id: string): Promise<void> {
    const result = await this.booksRepo.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException('Book not found');
    }
  }
}
