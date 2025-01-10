import {
  execute,
  queryAll,
  safeQuery,
  safeQueryAll,
  safeExecute,
  queryOne,
} from "../db/dbMod.ts";

export function createNotice(title: string, content: string, userId: number) {
  const query = `
      INSERT INTO notices (title, content, user_id) VALUES (?, ?, ?);
    `;
  return safeExecute(() => execute(query, title, content, userId));
}

export function getNoticesByUser(userId: number) {
  const query = `
      SELECT * FROM notices WHERE user_id = ?;
    `;
  return safeQueryAll(() => queryAll(query, userId));
}
export function getNoticeByUserIdAndNoticeId(userId: number, noticeId: number) {
  const query = `
      SELECT * FROM notices WHERE user_id = ? AND id = ?;
    `;
  // return safeQueryAll(() => queryAll(query, userId, noticeId));
  return safeQuery(() => queryOne(query, userId, noticeId));
}

export function getNoticesByNoticeId(noticeId: number) {
  const query = `
      SELECT * FROM notices WHERE id = ?;
    `;
  return safeQuery(() => queryOne(query, noticeId));
}

export function updateNotice(noticeId: number, title: string, content: string) {
  const query = `
      UPDATE notices SET title = ?, content = ? WHERE id = ?;
    `;
  return safeExecute(() => execute(query, title, content, noticeId));
}

export function deleteNotice(noticeId: number) {
  const query = `
      DELETE FROM notices WHERE id = ?;
    `;
  return safeExecute(() => execute(query, noticeId));
}
export function getAllNotices() {
  const query = `
      SELECT * FROM notices;
    `;
  return safeQueryAll(() => queryAll(query));
}
