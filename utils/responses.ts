import { Middleware, Status } from "@oak/oak";
import { LogEntry, SuccessResponse, ErrorResponse } from "./utilsMod.ts";
import * as log from "@std/log"; // Import the logging library

// Configure the logger (optional, but recommended)
await log.setup({
  handlers: {
    console: new log.ConsoleHandler("DEBUG", {
      useColors: false,
    }), // Log to console with DEBUG level
  },
  loggers: {
    default: {
      level: "DEBUG", // Set the default log level
      handlers: ["console"], // Use the console handler
    },
  },
});

// Helper function to format success responses
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

// Helper function to format error responses
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

// Improved logging middleware using @std/log
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

    // Calculate duration and update log entry
    entry.endTime = Date.now();
    entry.duration = entry.endTime - entry.startTime;
    entry.status = ctx.response.status;

    // Log the request details using @std/log
    log.info(`${entry.method} | ${entry.url} | ${entry.status}`, {
      duration: `${entry.duration}ms`,
      status: entry.status,
    });

    // Attach the log entry to the context state for later use
    ctx.state.logEntry = entry;
  } catch (error) {
    // Update log entry for errors
    entry.endTime = Date.now();
    entry.duration = entry.endTime - entry.startTime;
    entry.status = 500;

    // Log the error using @std/log
    log.error(
      `Error: ${error} - ${entry.method} | ${entry.url} | ${entry.status}`,
      {
        duration: `${entry.duration}ms`,
        status: entry.status,
      }
    );

    // Re-throw the error to let Oak handle it
    throw error;
  }
};
