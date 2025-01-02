import { router, validation } from "./routesMod.ts";
import {
  createNoticeHandler,
  getNoticesByUserHandler,
  noticeUpdaterHandler,
  noticeDeleterHandler,
  getNoticeByUserAndIdHandler,
  getNoticesByNoticeIdHandler,
} from "../controllers/controllersMod.ts";

router
  .post("/notices", validation.validateNoticeCreation, createNoticeHandler)
  .get("/notices/:userId", getNoticesByUserHandler)
  .get("/notices/anuncio/:noticeId", getNoticesByNoticeIdHandler)
  .get("/notices/:userId/:noticeId", getNoticeByUserAndIdHandler)
  .put("/notices/:noticeId", noticeUpdaterHandler)
  .delete("/notices/:noticeId", noticeDeleterHandler);
