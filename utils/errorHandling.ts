import { RouterContext } from "@oak/oak";
import { isEmptyObject } from "./utilsMod.ts";
import { getUserByUsername, getUserById } from "../models/modelsMod.ts";

export function checkUserExistsByUsername(
  ctx: RouterContext<string>,
  username: string
) {
  const user = getUserByUsername(username);
  if (isEmptyObject(user)) {
    ctx.response.status = 404;
    ctx.response.body = { error: "User not found" };
    return null;
  }
  return user;
}

export function checkUserExistsById(
  ctx: RouterContext<string>,
  userId: number
) {
  const user = getUserById(userId);
  if (isEmptyObject(user)) {
    ctx.response.status = 404;
    ctx.response.body = { error: "User not found" };
    return null;
  }
  return user;
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
      message: message,
      date: Date.now(),
    },
  };
  if (additionalDetails)
    response.error = {
      ...response.error,
      ...additionalDetails,
    };
  return response;
};
