import { Middleware } from "@oak/oak";
import { formatErrorResponse } from "./utilsMod.ts";

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
