import { BookLanguage, BookStatus } from "../enums/book.enum";

export class BookDto {
  readonly title: string;
  readonly genre: string;
  readonly description: string;
  readonly author: string;
  readonly publisher: string;
  readonly pages: number;
  readonly image_url: string;
  readonly publication_year: number;
  readonly isbn: string;
  readonly language: BookLanguage;
  readonly status: BookStatus;
}

export class UpdateBookDto {
  readonly title?: string;
  readonly genre?: string;
  readonly description?: string;
  readonly author?: string;
  readonly publisher?: string;
  readonly pages?: number;
  readonly image_url?: string;
  readonly publication_year?: number;
  readonly isbn?: string;
  readonly language?: BookLanguage;
}

export class UpdateBookStatusDto {
  readonly status: BookStatus;
}
