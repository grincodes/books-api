import express from "express";

import { bookRouter } from "../../../../modules/book/infra/http/routes";

const v1Router = express.Router();

v1Router.get("/", (req, res) => {
  return res.json({ message: "Yo! we're up" });
});

v1Router.use("/books", bookRouter);

export { v1Router };
