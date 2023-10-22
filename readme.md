## Books API

# How to's 
- **Install Deps:**  `npm i` 
- **Run dev:**  `npm run start:dev` 
- **Run test:**  ` cd src/tests && npx jest book_controller.spec.ts` 

# Endpoints
- `GET /api/v1/books`: Fetch a list of all books.
- `GET /api/v1//books/:id`: Fetch a specific book using its `id`.
- `POST /api/v1/books`: Add a new book (book details should be in the request body, excluding the `id` which should be auto-generated).
- `PUT /api/v1/books/:id`: Update a specific book using its `id`.
- `DELETE /api/v1/books/:id`: Delete a book using its `id`.