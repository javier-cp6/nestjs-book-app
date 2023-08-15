import { Injectable } from '@nestjs/common';
import { BookDto } from './book.dto';
import { Book } from './book.class';

@Injectable()
export class BooksService {
  books: Book[] = [
    {
      id: 1,
      title: 'Una historia de España',
      genre: 'Historia',
      description:
        'Un relato ameno, personal, a ratos irónico, pero siempre único, de nuestra accidentada historia a través de los siglos. Una obra concebida por el autor para, en palabras suyas, «divertirme, releer y disfrutar; un pretexto para mirar atrás desde los tiempos remotos hasta el presente, reflexionar un poco sobre ello y contarlo por escrito de una manera poco ortodoxa.',
      author: 'Arturo Pérez-Reverte',
      publisher: 'Alfaguara',
      pages: 256,
      image_url:
        'https://images-na.ssl-images-amazon.com/images/I/41%2B-e981m1L._SX311_BO1,204,203,200_.jpg',
    },
    {
      id: 2,
      title: 'Historia de España contada para escépticos',
      genre: 'Historia',
      description:
        'Como escribe el autor, no pretende ser veraz, justa y desapasionada, porque ninguna historia lo es. No está hecha para halagar a reyes y gobernantes, ni pretende halagar a los banqueros, ni a la Conferencia Episcopal, ni al colectivo gay.',
      author: 'Juan Eslava Galán',
      publisher: 'Booket',
      pages: 592,
      image_url:
        'https://images-na.ssl-images-amazon.com/images/I/51IyZ5Mq8YL._SX326_BO1,204,203,200_.jpg',
    },
  ];
  
  findAll(params): Book[] { 
    return this.books;
  }

  findBook(bookId: string): Book {
    const requestedBookId = parseInt(bookId);
    const foundBook = this.books.find(book => book.id === requestedBookId);

    return foundBook || null;
  }

  createBook(newBook: BookDto): Book {
    let book = new Book();

    const newBookId = this.books[this.books.length - 1].id + 1;

    book.id = newBookId;
    book.author = newBook.author;
    book.description = newBook.description;
    book.genre = newBook.genre;
    book.image_url = newBook.image_url;
    book.pages = newBook.pages;
    book.publisher = newBook.publisher;
    book.title = newBook.title;

    this.books.push(book)

    return book;
  }

  deleteBook(bookId: string): Book {
    const deletedBookId = parseInt(bookId);
    const existingBookIndex = this.books.findIndex(book => book.id === deletedBookId);
    
    if (existingBookIndex !== -1) {
      const deletedBook = this.books.splice(existingBookIndex, 1)[0];
      return deletedBook;
    } else {
      throw { error: `Book with ID ${deletedBookId} not found` }
    }
  }

  updateBook(bookId: string, bookData: BookDto): Book {
    const updatedBookId = parseInt(bookId);
    const existingBookIndex = this.books.findIndex(book => book.id === updatedBookId);
  
    if (existingBookIndex !== -1) {
      const updatedBook = { id: updatedBookId, ...bookData };
      this.books[existingBookIndex] = updatedBook;
      return updatedBook;
    } else {
      throw { error: `Book with ID ${updatedBookId} not found` };
    }
  }
}