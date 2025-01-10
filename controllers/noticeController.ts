import { RouterContext } from "@oak/oak";
import {
  createNotice,
  getNoticesByUser,
  updateNotice,
  deleteNotice,
  getNoticeByUserIdAndNoticeId,
  getNoticesByNoticeId,
  getAllNotices,
} from "../models/modelsMod.ts";
import {
  checkNoticeExistsByNoticeId,
  checkNoticeExistsByUserId,
} from "../utils/utilsMod.ts";

export async function createNoticeHandler(ctx: RouterContext<string>) {
  const { title, content, userId } = await ctx.request.body.json();

  // These will throw if not found
  checkNoticeExistsByUserId(userId);

  // This guard clause is not needed since the  function will throw an error if the user is not found
  // if (!user) return;

  createNotice(title, content, userId);
  ctx.response.status = 201;
  ctx.response.body = {
    message: `Notice created successfully! at ${new Date()}`,
  };
}

export function getNoticesByUserHandler(ctx: RouterContext<string>) {
  const userId = +ctx.params.userId;

  checkNoticeExistsByUserId(userId);

  const noticesObtainedById = getNoticesByUser(userId);
  ctx.response.body = noticesObtainedById;
}

export function getNoticeByUserAndIdHandler(ctx: RouterContext<string>) {
  const userId = +ctx.params.userId;
  const noticeId = +ctx.params.noticeId;

  checkNoticeExistsByUserId(userId);
  checkNoticeExistsByNoticeId(noticeId);

  const noticeObtainedByUserAndById = getNoticeByUserIdAndNoticeId(
    userId,
    noticeId
  );

  ctx.response.body = noticeObtainedByUserAndById;
}

export function getNoticesByNoticeIdHandler(ctx: RouterContext<string>) {
  const noticeId = +ctx.params.noticeId;

  checkNoticeExistsByNoticeId(noticeId);

  const noticesObtainedByNoticeId = getNoticesByNoticeId(noticeId);
  ctx.response.body = noticesObtainedByNoticeId;
}

export async function noticeUpdaterHandler(ctx: RouterContext<string>) {
  const noticeId = +ctx.params.noticeId;
  //   const { title, content, noticeId } = await ctx.request.body.json();
  const { title, content } = await ctx.request.body.json();

  checkNoticeExistsByNoticeId(noticeId);

  updateNotice(noticeId, title, content);
  ctx.response.status = 200;
  ctx.response.body = {
    message: `Notice updated successfully! at ${new Date()}`,
  };
}

export function noticeDeleterHandler(ctx: RouterContext<string>) {
  const noticeId = +ctx.params.noticeId;

  checkNoticeExistsByNoticeId(noticeId);

  deleteNotice(noticeId);
  ctx.response.status = 200;
  ctx.response.body = {
    message: `Notice deleted successfully! at ${new Date()}`,
  };
}
export function getAllNoticesHandler(ctx: RouterContext<string>) {
  const allNotices = getAllNotices();
  ctx.response.body = allNotices;
}
