// Este archivo debe contener utilidades para formatear las respuestas de tu API de manera consistente.
// Por ejemplo, asegurar que todas las respuestas exitosas tienen una estructura similar, o que los errores se presentan de manera uniforme.

import { Middleware, Status } from "@oak/oak";
import { LogEntry, SuccessResponse, ErrorResponse } from "./utilsMod.ts";

export const formatSuccessResponse = (
  message: string,
  code: number = 200,
  additionalData?: Record<string, unknown>
): SuccessResponse => {
  const response: SuccessResponse = {
    success: true,
    message,
    code,
  };

  if (additionalData) return { ...response, ...additionalData };

  return response;
};

export const formatErrorResponse = (
  status: Status,
  message: string,
  additionalDetails?: Record<string, unknown>
): ErrorResponse => {
  const response: ErrorResponse = {
    success: false,
    error: {
      status,
      message: message,
      date: Date.now(),
    },
  };

  if (additionalDetails)
    response.error = { ...response.error, ...additionalDetails };

  return response;
};

// Middleware type requires this specific signature
export const loggingMiddleware: Middleware = async (ctx, next) => {
  const entry: LogEntry = {
    method: ctx.request.method,
    url: ctx.request.url.toString(),
    startTime: Date.now(),
    endTime: 0,
    duration: 0,
  };

  try {
    await next();

    entry.endTime = Date.now();
    entry.duration = entry.endTime - entry.startTime;
    // entry.status = ctx.response.status || 200;
    entry.status = ctx.response.status;

    console.log(
      `${entry.method} ${entry.url}\nDuration: ${entry.duration}ms | Status: ${entry.status}`
    );
    // console.log(entry);
    ctx.state.logEntry = entry;
  } catch (error) {
    entry.endTime = Date.now();
    entry.duration = entry.endTime - entry.startTime;
    entry.status = 500;
    console.error(`Error: ${error} - ${entry.method} ${entry.url}`);
    throw error;
  }
};
