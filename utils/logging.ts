import { Middleware } from "@oak/oak";
import { LogEntry, formatErrorResponse } from "./utilsMod.ts";
import * as log from "@std/log"; // Import the logging library

export class Logging {
  constructor() {
    this.setupLogger();
  }

  setupLogger() {
    // Initialize the logging system with a configuration object
    log.setup({
      // Define the available handlers (outputs) for logging
      handlers: {
        // Create a new console handler that will output to terminal/console
        // Set minimum level to "DEBUG" (will show all logs at DEBUG level and above)
        // useColors: false means log output will be plain text without color formatting
        console: new log.ConsoleHandler("DEBUG", {
          useColors: true,
        }),
      },

      // Define logger configurations
      loggers: {
        // Configure the default logger that will be used when no specific logger is specified
        default: {
          // Set the minimum logging level to "DEBUG"
          // This means all log levels will be shown (DEBUG, INFO, WARN, ERROR)
          level: "DEBUG",
          // Specify which handlers to use - in this case, use the "console" handler defined above
          handlers: ["console"],
        },
      },
    });
  }

  logRequest(entry: LogEntry) {
    log.info(
      `${entry.method} | ${entry.url} | ${entry.status} | ${entry.duration}ms`
    );
  }

  logError(error: Error, entry: LogEntry) {
    // log.error(
    //   `Error: ${error.message} - ${entry.method} | ${entry.url} | ${entry.status} | ${entry.duration}ms`
    // );
    //  The logging library treats the primary message as a string and doesn't stringify subsequent objects unless explicitly passed as additional arguments.
    log.error(
      `Error: ${error.message}\nEntry: ${JSON.stringify(entry, null, 2)}`
    );
  }
}

const logger = new Logging();

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
    entry.status = ctx.response.status;

    logger.logRequest(entry);
    ctx.state.logEntry = entry;
  } catch (error) {
    entry.endTime = Date.now();
    entry.duration = entry.endTime - entry.startTime;
    // If undenfined or null, set the status to 500
    entry.status = ctx.response.status ?? 500;

    // Don't need the logError function here because that is why we have the loggingErrorMiddleware
    throw error;
  }
};

export const loggingErrorMiddleware: Middleware = async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // If undenfined or null, set the status to 500
    const status = ctx.response.status ?? 500;
    const message =
      error instanceof Error ? error.message : "Internal Server Error";

    ctx.response.status = status;
    ctx.response.body = formatErrorResponse(status, message, {
      errorType: status >= 500 ? "UnhandledError" : "ClientError",
    });

    // Log the error with detailed context
    const entry: LogEntry = {
      method: ctx.request.method,
      url: ctx.request.url.toString(),
      startTime: ctx.state.logEntry?.startTime || Date.now(),
      endTime: Date.now(),
      duration: Date.now() - (ctx.state.logEntry?.startTime || Date.now()), // Update duration based on timing
      status,
    };

    // console.log(entry);
    // console.log("----------------");

    logger.logError(
      error instanceof Error ? error : new Error("Unknown error occurred"),
      entry
    );
  }
};
// Attach the log entry to the context state for later use
// ctx.state.logEntry = entry;
// Re-throw the error to let Oak handle it
// throw error;
