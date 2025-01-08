import {
  execute,
  executeTransaction,
  queryAll,
  queryOne,
  safeQuery,
} from "../db/dbMod.ts";

export function createUser(username: string, email: string) {
  const query = `
      INSERT INTO users (username, email) VALUES (?, ?);
    `;
  return execute(query, username, email);
}

// Neccessary safe query function
export function getAllUsers() {
  const query = `
      SELECT * FROM users;
    `;
  return queryAll(query);
}

// export function getUserByUsername(username: string) {
//   const query = `
//       SELECT * FROM users WHERE username = ?;
//     `;
//   return queryOne(query, username);
// }
export function getUserByUsername(username: string) {
  const query = `
      SELECT * FROM users WHERE username = ?;
    `;
  return safeQuery(() => queryOne(query, username));
}
export function getUserById(userId: number) {
  const query = `
      SELECT * FROM users WHERE id = ?;
    `;
  return safeQuery(() => queryOne(query, userId));
}

// Neccessary safe query function
export function updateUser(userId: number, username: string, email: string) {
  const query = `
  UPDATE users SET username = ?, email = ? WHERE id = ?;
  `;
  return execute(query, username, email, userId);
}

// Neccessary safe query function
export function deleteUser(userId: number) {
  const query = `
      DELETE FROM users WHERE id = ?;
      `;
  return execute(query, userId);
}

export function getUserAndUpdateUser(
  userId: number,
  username: string,
  email: string
) {
  const queries = [
    "SELECT * FROM users WHERE id = ?",
    "UPDATE users SET username = ?, email = ? WHERE id = ?",
  ];
  const params = [[userId], [username, email, userId]];
  return executeTransaction(queries, params);
}
