import { BaseController } from "../../../lib/core/infra/BaseController";
import { GenericAppError } from "../../../lib/core/logic/AppError";
import { DomainError } from "../../../lib/core/logic/DomainError";
import "reflect-metadata";
import { BookService } from "./BookService";
import { BookErrors } from "../domain/BookErrors";

export class BookController extends BaseController {
  private bookService: BookService;

  constructor(bookService: BookService) {
    super();
    this.bookService = bookService;
  }

  async createBook(): Promise<any> {
    try {
      const dto = this.req.body;

      const result = await this.bookService.createBook(dto);
      const resultVal = result.value;

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GenericAppError.UnexpectedError:
            return this.conflict(error.errorValue().message);
          case DomainError:
            return this.clientError(error.errorValue().message);
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.ok(this.res, resultVal.getValue());
      }
    } catch (err) {
      this.fail(err);
    }
  }

  async findBook(): Promise<any> {
    try {
      const bookId = this.req.params.id;

      const result = await this.bookService.findBook(bookId);
      const resultVal = result.value;

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GenericAppError.UnexpectedError:
            return this.conflict(error.errorValue().message);
          case BookErrors.BookDoesNotExist:
            return this.notFound(error.errorValue().message);
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.ok(this.res, resultVal.getValue());
      }
    } catch (err) {
      this.fail(err);
    }
  }

  async findAllBook(): Promise<any> {
    try {
      const bookId = this.req.params.id;

      const result = await this.bookService.findAllBook();
      const resultVal = result.value;

      return this.ok(this.res, resultVal.getValue());
    } catch (err) {
      this.fail(err);
    }
  }

  async updateBook(): Promise<any> {
    try {
      const bookId = this.req.params.id;
      const book = this.req.body;

      const result = await this.bookService.updateBook(bookId, book);
      const resultVal = result.value;

      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case GenericAppError.UnexpectedError:
            return this.conflict(error.errorValue().message);
          case BookErrors.BookDoesNotExist:
            return this.notFound(error.errorValue().message);
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.ok(this.res, resultVal.getValue());
      }
    } catch (err) {
      this.fail(err);
    }
  }

  async deleteBook(): Promise<any> {
    try {
      const bookId = this.req.params.id;

      const result = await this.bookService.deleteBook(bookId);
      const resultVal = result.value;

      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case GenericAppError.UnexpectedError:
            return this.conflict(error.errorValue().message);
          case BookErrors.BookDoesNotExist:
            return this.notFound(error.errorValue().message);
          default:
            return this.fail(error.errorValue().message);
        }
      } else {
        return this.ok(this.res, resultVal.getValue());
      }
    } catch (err) {
      this.fail(err);
    }
  }
}
