import { 
  Controller, 
  Get, 
  Post,
  Put,
  Delete,
  Param,
  Req,
  Body,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity'; 
import { BookDto, UpdateBookDto, UpdateBookStatusDto } from './book.dto';
import { Request } from 'express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../enums/role.enum';
import { Roles } from '../auth/roles.decorator';
import { ApiOperation, ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('books') 
@Controller('books')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth('access-token') 
@Roles(Role.Admin)
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
