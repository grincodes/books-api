import { UniqueEntityID } from "../../../lib/core/domain/UniqueEntityID";
import { Book } from "../domain/Book";
import { BookModel } from "../infra/data/book_data";

export class BookMap {
  public static toPersistence(book: Book): BookModel {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      publishedDate: book.publishedDate,
    };
  }

  public static toDomain(raw: any): Book {
    const bookOrError = Book.create(
      {
        id: raw.id,
        title: raw.title,
        author: raw.author,
        publishedDate: raw.publishedDate,
      },
      new UniqueEntityID(raw.id)
    );

    bookOrError.isFailure ? console.log(bookOrError.error) : "";

    return bookOrError.isSuccess ? bookOrError.getValue() : null;
  }
}
