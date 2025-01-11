# TO DOs

## DONE

- Docker init and setup the db.

- Logging:

  Implement a more robust logging system using a library like log from Deno's standard library.

- Error Handling:

  Improve error handling by creating custom error classes and middleware to handle different types of errors.

## Dockerize the app

- Still need to improve the dev compose.

## Recommendations for Further Implementations:

- Unit Testing:

  Implement unit tests for your controllers, models, and utility functions. Use a testing framework like Deno's built-in testing library.

- Validation:

  Enhance validation logic using a library like zod or yup for more comprehensive validation.

- Rate Limiting:

  Implement rate limiting to prevent abuse of your API endpoints.

- Pagination:

  Implement pagination for endpoints that return lists of data (e.g., users, notices).

- Search and Filtering:

  Add search and filtering capabilities to your endpoints.

- Role-Based Access Control (RBAC):

  Implement RBAC to restrict access to certain endpoints based on user roles.

- Environment Configuration:

  Use a library like dotenv to manage environment variables more effectively.

- API Documentation:

  Generate API documentation using a tool like swagger or redoc.

## Recommendations for Refactors:

- Service Layer:

  Introduce a service layer to separate business logic from controllers.

- Repository Pattern:

  Implement the repository pattern to abstract database interactions.

- Dependency Injection:

  Use dependency injection to manage dependencies and improve testability.

- Modularization:

  Further modularize your codebase by grouping related functionality into modules.

- Code Consistency:

  Ensure consistent coding styles and practices across the codebase using tools like prettier and eslint.
