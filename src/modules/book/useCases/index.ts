import { BookRepo } from "../infra/repo/BookRepo";
import { BookController } from "./BookController";
import { BookService } from "./BookService";

const bookRepo = new BookRepo();
const bookService = new BookService(bookRepo);
const bookController = new BookController(bookService);

export { bookService, bookController };
