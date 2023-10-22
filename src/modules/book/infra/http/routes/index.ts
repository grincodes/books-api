import express from "express";
import "reflect-metadata";

import { bookController } from "../../../useCases";

const bookRouter = express.Router();

//findAllBooks
bookRouter.get("/", (req: any, res) => {
  bookController.execute(req, res, () => bookController.findAllBook());
});

bookRouter.post("/", (req, res, next) => {
  bookController.execute(req, res, () => bookController.createBook());
});

//findBook
bookRouter.get("/:id", (req: any, res) => {
  bookController.execute(req, res, () => bookController.findBook());
});

//updateBook
bookRouter.put("/:id", (req: any, res) => {
  bookController.execute(req, res, () => bookController.updateBook());
});

//deleteBook
bookRouter.delete("/:id", (req: any, res) => {
  bookController.execute(req, res, () => bookController.deleteBook());
});

export { bookRouter };
