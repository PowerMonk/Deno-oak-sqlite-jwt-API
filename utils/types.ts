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
