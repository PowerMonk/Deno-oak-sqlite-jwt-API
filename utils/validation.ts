import { Middleware } from "@oak/oak";
import { queryAll } from "../db/dbMod.ts";

export class Validation {
  #validateMinLength(value: string, minLength: number): boolean {
    return value.length >= minLength;
  }

  #validateEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  #validatePositiveNumber(value: number): boolean {
    return value > 0;
  }

  #userExists(username: string): boolean {
    const query = `SELECT COUNT(*) as count FROM users WHERE username = ?`;
    const result = queryAll<{ count: number }>(query, username);
    return result[0].count > 0;
  }

  #emailExists(email: string): boolean {
    const query = `SELECT COUNT(*) as count FROM users WHERE email = ?`;
    const result = queryAll<{ count: number }>(query, email);
    return result[0].count > 0;
  }

  validateUserCreation: Middleware = async (ctx, next) => {
    const { username, email } = await ctx.request.body.json();

    if (!this.#validateMinLength(username, 4)) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Username must be at least 4 characters long",
      };
      return;
    }

    if (!this.#validateEmailFormat(email)) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Invalid email format" };
      return;
    }

    if (this.#userExists(username)) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Username already exists" };
      return;
    }

    if (this.#emailExists(email)) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Email already exists" };
      return;
    }

    await next();
  };

  validateNoticeCreation: Middleware = async (ctx, next) => {
    const { title, content, userId } = await ctx.request.body.json();

    if (!this.#validateMinLength(title, 4)) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Title must be at least 4 characters long" };
      return;
    }

    if (!this.#validateMinLength(content, 10)) {
      ctx.response.status = 400;
      ctx.response.body = {
        error: "Content must be at least 10 characters long",
      };
      return;
    }

    if (!this.#validatePositiveNumber(userId)) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Invalid userId" };
      return;
    }

    await next();
  };
}
