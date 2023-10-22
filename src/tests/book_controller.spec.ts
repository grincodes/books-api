import request from "supertest";
import { app } from "../lib/infra/http/app";

describe("API Endpoint Tests", () => {
  it("GET /api/v1/books should return a list of books", (done) => {
    request(app)
      .get("/api/v1/books")
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);

        expect(res._body).toHaveLength(2);
        done();
      });
  });

  it("POST /api/v1/books should add a new book", (done) => {
    const newBook = {
      title: "New Book",
      author: "New Author",
      publishedDate: "2023-10-22T10:26:34.694Z",
    };
    request(app)
      .post("/api/v1/books")
      .send(newBook)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        // Add your assertions here
        expect(res._body.title).toBe("New Book");
        done();
      });
  });

  afterAll(() => {
    // Clean up or close server, if necessary
  });
});
