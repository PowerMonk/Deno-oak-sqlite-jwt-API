import { RouterContext } from "@oak/oak";
import {
  createNotice,
  getNoticesByUser,
  updateNotice,
  deleteNotice,
  getNoticeByUserIdAndNoticeId,
  getNoticesByNoticeId,
} from "../models/modelsMod.ts";

export async function createNoticeHandler(ctx: RouterContext<string>) {
  const { title, content, userId } = await ctx.request.body.json();
  try {
    createNotice(title, content, userId);
    ctx.response.status = 201;
    ctx.response.body = {
      message: `Notice created successfully! at ${new Date()}`,
    };
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error: error };
  }
}

export function getNoticesByUserHandler(ctx: RouterContext<string>) {
  try {
    const userId = +ctx.params.userId;

    if (isNaN(userId)) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Invalid userId parameter" };
      return;
    }
    const noticesObtainedById = getNoticesByUser(userId);
    ctx.response.body = noticesObtainedById;
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error: error };
  }
}
export function getNoticeByUserAndIdHandler(ctx: RouterContext<string>) {
  try {
    const userId = +ctx.params.userId;
    const noticeId = +ctx.params.noticeId;
    if (isNaN(userId) || isNaN(noticeId)) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Invalid userId or noticeId parameter" };
      return;
    }
    const noticeObtainedByUserAndById = getNoticeByUserIdAndNoticeId(
      userId,
      noticeId
    );
    if (!noticeObtainedByUserAndById) {
      ctx.response.status = 404;
      ctx.response.body = { error: "Notice not found" };
      return;
    }
    ctx.response.body = noticeObtainedByUserAndById;
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error: error };
  }
}

export function getNoticesByNoticeIdHandler(ctx: RouterContext<string>) {
  try {
    const noticeId = +ctx.params.noticeId;

    if (isNaN(noticeId)) {
      ctx.response.status = 400;
      ctx.response.body = { error: "Invalid noticeId parameter" };
      return;
    }
    const noticesObtainedByNoticeId = getNoticesByNoticeId(noticeId);
    ctx.response.body = noticesObtainedByNoticeId;
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error: error };
  }
}

export async function noticeUpdaterHandler(ctx: RouterContext<string>) {
  const noticeId = +ctx.params.noticeId;
  //   const { title, content, noticeId } = await ctx.request.body.json();
  const { title, content } = await ctx.request.body.json();
  try {
    updateNotice(noticeId, title, content);
    ctx.response.status = 200;
    ctx.response.body = {
      message: `Notice updated successfully! at ${new Date()}`,
    };
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error: error };
  }
}

export function noticeDeleterHandler(ctx: RouterContext<string>) {
  const noticeId = +ctx.params.noticeId;
  try {
    deleteNotice(noticeId);
    ctx.response.status = 200;
    ctx.response.body = {
      message: `Notice deleted successfully! at ${new Date()}`,
    };
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error: error };
  }
}
