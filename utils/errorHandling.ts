// import { RouterContext } from "@oak/oak";
import { isEmptyObject } from "./utilsMod.ts";
import {
  getUserByUsername,
  getUserById,
  getNoticesByNoticeId,
} from "../models/modelsMod.ts";

export function checkUserExistsByUsername(username: string) {
  const user = getUserByUsername(username);
  if (isEmptyObject(user)) {
    throw new Error(`User not found with username: ${username}`);
  }
  return user;
}

export function checkUserExistsById(userId: number) {
  const user = getUserById(userId);
  if (isEmptyObject(user)) {
    throw new Error(`User not found with id: ${userId}`);
  }
  return user;
}
// Pending to get implementation in the noticeController.ts
export function checkNoticeExistsByUsername(username: string) {
  const user = getUserByUsername(username);
  if (isEmptyObject(user)) {
    throw new Error(`User not found with username: ${username}`);
  }
  return user;
}

export function checkNoticeExistsByUserId(userId: number) {
  const user = getUserById(userId);
  if (isEmptyObject(user)) {
    throw new Error(`User not found with id: ${userId}`);
  }
  return user;
}

export function checkNoticeExistsByNoticeId(noticeId: number) {
  const notice = getNoticesByNoticeId(noticeId);
  if (isEmptyObject(notice)) {
    throw new Error(`Notice not found with id: ${noticeId}`);
  }
  return notice;
}

export const formatErrorResponse = (
  status: number,
  message: string,
  additionalDetails?: Record<string, unknown>
) => {
  const response = {
    success: false,
    error: {
      status,
      message,
      date: new Date().toISOString(),
    },
  };
  if (additionalDetails) {
    Object.assign(response.error, additionalDetails);
  }
  return response;
};
