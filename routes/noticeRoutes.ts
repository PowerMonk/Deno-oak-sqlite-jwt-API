import { router, validation } from "./routesMod.ts";
import {
  createNoticeHandler,
  getNoticesByUserHandler,
  noticeUpdaterHandler,
  noticeDeleterHandler,
  getNoticeByUserAndIdHandler,
  getNoticesByNoticeIdHandler,
  getAllNoticesHandler,
} from "../controllers/controllersMod.ts";
import { authMiddleware } from "../auth/authMod.ts";

router
  .post("/notices", validation.validateNoticeCreation, createNoticeHandler)
  .get("/notices", authMiddleware, getAllNoticesHandler)
  .get("/notices/:userId", authMiddleware, getNoticesByUserHandler)
  .get(
    "/notices/anuncio/:noticeId",
    authMiddleware,
    getNoticesByNoticeIdHandler
  )
  .get(
    "/notices/:userId/:noticeId",
    authMiddleware,
    getNoticeByUserAndIdHandler
  )
  .put("/notices/:noticeId", authMiddleware, noticeUpdaterHandler)
  .delete("/notices/:noticeId", authMiddleware, noticeDeleterHandler);
