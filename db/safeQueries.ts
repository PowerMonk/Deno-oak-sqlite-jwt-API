import { AppError } from "../utils/utilsMod.ts";
import { DatabaseRow } from "./dbMod.ts";

export function safeQuery<T extends DatabaseRow>(
  queryFn: () => T | null
): T | null {
  try {
    return queryFn();
  } catch (error) {
    // Log and re-throw the error as an AppError
    throw new AppError(`Database query error: ${error}`, 500, {
      type: "DatabaseError",
    });
  }
}

export function safeQueryAll<T extends DatabaseRow>(queryFn: () => T[]): T[] {
  try {
    return queryFn();
  } catch (error) {
    throw new AppError(`Database queryAll error: ${error}`, 500, {
      type: "DatabaseError",
    });
  }
}

// queryFn: () => number means that queryFn is a function that takes no arguments and returns a value of type number.
export function safeExecute(queryFn: () => number): number {
  try {
    return queryFn();
  } catch (error) {
    throw new AppError(`Database execute error: ${error}`, 500, {
      type: "DatabaseError",
    });
  }
}

export function safeExecuteTransaction(queryFn: () => number[]): number[] {
  try {
    return queryFn();
  } catch (error) {
    throw new AppError(`Database execute transaction error: ${error}`, 500, {
      type: "DatabaseError",
    });
  }
}
