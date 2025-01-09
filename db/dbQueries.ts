import { Database } from "jsr:@db/sqlite";

const db = new Database("megafonito.db");

export interface DatabaseRow {
  [key: string]: string | number | boolean | null | Uint8Array;
}

/**
 * Executes a SQL query that modifies the database (e.g., INSERT, UPDATE, DELETE).
 * @param query - The SQL query string to be executed.
 * @param params - Optional parameters to be used in the SQL query.
 *   Supported types: string, number, null, Uint8Array, boolean
 * @returns The result of the query execution.
 * @throws Will throw an error if the query execution fails.
 */
export function execute(
  query: string,
  ...params: (string | number | null | Uint8Array | boolean)[]
) {
  try {
    // Prepare the SQL query and execute it with the provided parameters
    const result = db.prepare(query).run(...params);
    return result;
  } catch (error) {
    // Log and rethrow the error if the query execution fails
    console.error("Database execution error:", error);
    throw error;
  }
}

/**
 * Executes a SQL query that retrieves data from the database (e.g., SELECT).
 * @param query - The SQL query string to be executed.
 * @param params - Optional parameters to be used in the SQL query.
 *   Supported types: string, number, null, Uint8Array, boolean
 * @returns An array of rows resulting from the query execution.
 * @throws Will throw an error if the query execution fails.
 */
export function queryAll<T extends DatabaseRow>(
  query: string,
  ...params: (string | number | null | Uint8Array | boolean)[]
): T[] {
  try {
    // Prepare the SQL query and execute it with the provided parameters
    const rows = db.prepare(query).all(...params);
    return rows as T[];
  } catch (error) {
    // Log and rethrow the error if the query execution fails
    console.error("Database query error:", error);
    throw error;
  }
}

/**
 * Executes a SQL query that retrieves a single row from the database (e.g., SELECT).
 * @param query - The SQL query string to be executed.
 * @param params - Optional parameters to be used in the SQL query.
 *   Supported types: string, number, null, Uint8Array, boolean
 * @returns A single row resulting from the query execution.
 * @throws Will throw an error if the query execution fails.
 */
export function queryOne<T extends DatabaseRow>(
  query: string,
  ...params: (string | number | null | Uint8Array | boolean)[]
): T | null {
  try {
    // Prepare the SQL query and execute it with the provided parameters
    const row = db.prepare(query).get(...params);
    return row as T;
    // return row as T | null;
  } catch (error) {
    // Log and rethrow the error if the query execution fails
    console.error("Database query error:", error);
    throw error;
  }
}

/**
 * Executes a SQL transaction.
 * @param queries - An array of SQL query strings to be executed within the transaction.
 * @param params - An array of arrays containing parameters for each query.
 * @returns The result of the transaction execution.
 * @throws Will throw an error if the transaction execution fails.
 */
export function executeTransaction(
  queries: string[],
  params: (string | number | null | Uint8Array | boolean)[][]
): number[] {
  const results: number[] = [];

  const transaction = db.transaction(() => {
    for (let i = 0; i < queries.length; i++) {
      const result = db.prepare(queries[i]).run(...params[i]);
      results.push(result);
    }
  });

  try {
    transaction();
    console.log("Transaction executed successfully!");
    return results;
  } catch (error) {
    console.error("Transaction execution error:", error);
    throw error;
  }
}

/**
 * Closes the database connection.
 * Should be called when the application is shutting down to ensure all resources are released.
 */
export function closeDatabase() {
  db.close();
}
