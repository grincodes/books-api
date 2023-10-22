import { BookModel, Books } from "../data/book_data";
import { v4 as uuid } from "uuid";

export class BookRepo {
  async create(book: BookModel) {
    Books.push(book);

    return book;
  }

  async findById(id: string): Promise<BookModel> {
    const book = Books.find((data) => {
      return data.id === id ? data : null;
    });

    return book;
  }

  async findAll(): Promise<BookModel[]> {
    return Books;
  }

  async updateBook(id: string, book: BookModel) {
    let bookIndex: number = Books.findIndex((book) => book.id === id);

    if (bookIndex == -1) {
      return null;
    }

    Books[bookIndex] = book;

    return book;
  }

  async deleteId(id: string) {
    let bookIndex: number = Books.findIndex((book) => book.id === id);

    if (bookIndex == -1) {
      return null
    }

    Books.splice(bookIndex, 1);

    return bookIndex.toString();
  }
}
