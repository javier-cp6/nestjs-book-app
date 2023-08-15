import { 
  Controller, 
  Get, 
  Post,
  Put,
  Delete,
  Param,
  Query,
  Req,
  Body,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { BookDto } from './book.dto';
import { Book } from './book.class';
import { Request } from 'express';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  findAll(@Req() request: Request): Book[] { 
    return this.booksService.findAll(request.query); 
  }

  @Get(':bookId')
  findBook(@Param('bookId') bookId: string): Book {
    return this.booksService.findBook(bookId);
  }

  @Post()
  createBook(@Body() newBook: BookDto): Book {
    return this.booksService.createBook(newBook);
  }

  @Delete(':bookId')
  deleteBook(@Param('bookId') bookId: string): Book {
    return this.booksService.deleteBook(bookId)
  }

  @Put(':bookId')
  updateBook(@Param('bookId') bookId: string, @Body() bookData: BookDto): Book {
    return this.booksService.updateBook(bookId, bookData);
  }
}
