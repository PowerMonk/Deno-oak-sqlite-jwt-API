import { Middleware, RouterContext } from "@oak/oak";
import { formatErrorResponse, isEmptyObject } from "./utilsMod.ts";
import { getUserByUsername, getUserById } from "../models/modelsMod.ts";

export class APIError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

export const errorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    const status = error instanceof APIError ? error.status : 500;
    const message =
      error instanceof Error ? error.message : "Internal Server Error";
    const errorType = error instanceof APIError ? "APIError" : "UnhandledError";

    ctx.response.status = status;
    ctx.response.body = formatErrorResponse(status, message, { errorType });
  }
};

export function checkUserExistsByUsername(
  ctx: RouterContext<string>,
  username: string
) {
  const user = getUserByUsername(username);
  if (isEmptyObject(user)) {
    ctx.response.status = 404;
    ctx.response.body = { error: "User not found" };
    return null;
  }
  return user;
}

export function checkUserExistsById(
  ctx: RouterContext<string>,
  userId: number
) {
  const user = getUserById(userId);
  if (isEmptyObject(user)) {
    ctx.response.status = 404;
    ctx.response.body = { error: "User not found" };
    return null;
  }
  return user;
}
