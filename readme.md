# Megafonito API

A simple REST API built with Deno, Oak framework and SQLite for managing users and notices.

---

## Technologies Used

- **Deno** - A secure runtime for JavaScript and TypeScript.
- **Oak** - A middleware framework for Deno's HTTP server.
- **SQLite** - A lightweight, serverless database.
- **JWT** - JSON Web Tokens for authentication.
- **JOSE** - JavaScript Object Signing and Encryption library.

---

## Prerequisites

1. Install [Deno](https://docs.deno.com/runtime/getting_started/installation/) from the official site (if not already installed).
2. Ensure you have SQLite installed on your system (Starting up the project should create the local db for you since it is or should be correctly setup).

---

## Getting Started

1. Clone the repository:

```bash
mkdir oak_and_sqlite
git clone https://github.com/PowerMonk/Deno-oak-sqlite-jwt-API.git
cd oak_and_sqlite
```

2. Create a `.env` file in the root directory:

- Create a custom, fairly simple JWT key, an example here

```
SECRET_JWT = X7#kY9$mN4@pL2vB8*tA5
```

3. Run the server:

```bash
deno task server
```

The server will start on `http://localhost:8000`.

---

## API Routes

- Here, you'll have to visit the `userController.ts` and `noticeController.ts` in order to know what type of body info you need to send to the request either via the URL or the request body or the request parameters.
- You'll need to use a tool like Postman or Thunderclient, I personally recommend Thunderclient directly in the IDE (VSCode).

### Authentication

#### **_For every method besides these two displayed in authentication, you'll have to be logged in._**

- `POST /users` - Create a user so that you can login in the future, this will also return a JWT to do the rest of the operations.

```json
{
  "username": "your-new-username",
  "email": "your-email@email.com"
}
```

- `POST /login` - Log in with a valid username. This will return a JWT token valid for 2 hours.

```json
{
  "username": "your-valid-username"
}
```

### Header authentication

Protected routes require a JWT token in the Authorization request header:

```
Authorization: Bearer <your-jwt-token>
```

### Users (Protected Routes - Require JWT)

- `GET /users` - Get all users
- `GET /users/getuser/:username` - Get a single user
- `PUT /users/:userId` - Update user
- `DELETE /users/:userId` - Delete user
- `PUT /users/dualtransaction/:userId` - Get and update user in transaction (this method will have future changes to make it more reliable and actually do something cool)

### Notices

- `POST /notices` - Create notice, if you don't remember your userId, you can always go back to the get requests for users, either all users or just one of them, all you have to do is login first and then create the requests.

```json
{
  "title": "set-a-title",
  "content": "write-some-content",
  "userId": "youruserId"
}
```

- `GET /notices/:userId` - Get notices by user
- `GET /notices/anuncio/:noticeId` - Get notice by ID
- `PUT /notices/:noticeId` - Update notice (remember to include the noticeId in the request)

```json
{
  "title": "set-a-title",
  "content": "write-some-content"
}
```

- `DELETE /notices/:noticeId` - Delete notice

---

Trying to get better every day!
Any inquiries? Hmu @krlmora05 on instagram!
