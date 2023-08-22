import { 
  Controller, 
  Get, 
  Post,
  Put,
  Delete,
  Param,
  Req,
  Body,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto, UpdateBookDto, UpdateBookStatusDto } from './book.dto';
import { Book } from './book.entity'; 
import { Request } from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Req() request: Request): Promise<Book[]> { 
    return this.booksService.findAll(); 
  }

  @Get(':bookId')
  findBook(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.findBook(bookId);
  }

  @Post()
  createBook(@Body() newBook: BookDto): Promise<Book> {
    return this.booksService.createBook(newBook);
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string): Promise<Book> {
    return this.booksService.deleteBook(bookId)
  }

  @Put(':bookId')
  updateBook(
    @Param('bookId') bookId: string,
    @Body() bookData: UpdateBookDto | UpdateBookStatusDto
  ): Promise<Book> {
    return this.booksService.updateBook(bookId, bookData);
  }
}
