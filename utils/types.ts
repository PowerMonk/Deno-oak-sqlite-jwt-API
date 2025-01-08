import { Status } from "@oak/oak";

// export interface LoggerOptions {
//   silent?: boolean;
// }

export interface LogEntry {
  method: string;
  url: string;
  startTime: number;
  endTime: number;
  duration: number;
  status?: number;
}
export interface ErrorResponse {
  success: boolean;
  error: {
    status?: Status;
    message: string;
    date: number;
  };
  additionalDetails?: Record<string, unknown>;
}
export interface SuccessResponse {
  success: boolean;
  message: string;
  code: number;
  additionalData?: Record<string, unknown>;
}

export class AppError extends Error {
  public status: number;
  public details?: unknown;

  constructor(message: string, status: number = 500, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function handleError(error: Error): AppError {
  if (error.message.includes("Database query error")) {
    return new AppError(error.message, 500, { type: "DatabaseError" });
  }
  return new AppError(error.message, 500);
}
