import {
  CreateResponse,
  DeletedResponse,
  UpdateResponse,
} from "../../../lib/common/constants";
import { GenericAppError } from "../../../lib/core/logic/AppError";
import { DomainError } from "../../../lib/core/logic/DomainError";
import { Either, Result, left, right } from "../../../lib/core/logic/Result";

import "reflect-metadata";
import { BookRepo } from "../infra/repo/BookRepo";
import { BookModel } from "../infra/data/book_data";
import { BookErrors } from "../domain/BookErrors";
import { CreateBookDto } from "../dto/CreateBook";
import { Book } from "../domain/Book";
import { BookMap } from "../mappers/BookMap";

type Response = Either<
  GenericAppError.UnexpectedError | BookErrors.BookDoesNotExist | DomainError,
  | Result<BookModel[]>
  | Result<Book>
  | Result<UpdateResponse>
  | Result<DeletedResponse>
  | Result<CreateResponse>
>;

export class BookService {
  private bookRepo: BookRepo;

  constructor(bookRepo: BookRepo) {
    this.bookRepo = bookRepo;
  }

  async createBook(dto: CreateBookDto): Promise<Response> {
    try {
      const bookOrError = Book.create(dto);

      if (bookOrError.isFailure) {
        return left(DomainError.create(bookOrError.errorValue())) as Response;
      }

      const book = bookOrError.getValue();

      const data = BookMap.toPersistence(book)


      const res = await this.bookRepo.create(data);

      return right(Result.ok<BookModel>(res)) as Response;
    } catch (error) {
      return left(error) as Response;
    }
  }

  async findBook(id: string) {
    try {
      const res = await this.bookRepo.findById(id);

      if (!res) {
        return left(new BookErrors.BookDoesNotExist()) as Response;
      }

      return right(Result.ok<BookModel>(res)) as Response;
    } catch (error) {
      return left(error) as Response;
    }
  }

  async findAllBook() {
    try {
      const res = await this.bookRepo.findAll();

      return right(Result.ok<BookModel[]>(res)) as Response;
    } catch (error) {
      return left(error) as Response;
    }
  }

  async updateBook(id, book: CreateBookDto) {
    try {
      const res = await this.bookRepo.updateBook(id, book);

      if (!res) {
        return left(new BookErrors.BookDoesNotExist()) as Response;
      }

      return right(
        Result.ok<UpdateResponse>({
          id: res.id,
          status: true,
        })
      ) as Response;
    } catch (error) {
      return left(error) as Response;
    }
  }

  async deleteBook(id: string) {
    try {
      const deletedIdx = await this.bookRepo.deleteId(id);

      if (!deletedIdx) {
        return left(new BookErrors.BookDoesNotExist()) as Response;
      }

      return right(
        Result.ok<DeletedResponse>({
          id: deletedIdx,
          status: true,
        })
      ) as Response;
    } catch (error) {
      return left(error) as Response;
    }
  }
}
