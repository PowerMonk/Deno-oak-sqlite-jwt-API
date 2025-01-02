import { Router } from "@oak/oak";
import {
  userCreatorHandler,
  getAllUsersHandler,
  userUpdaterHandler,
  userDeleterHandler,
  getSingleUserHandler,
  getUserAndUpdateHandler,
  loginHandler,
} from "../controllers/controllersMod.ts";
import { Validation } from "../utils/utilsMod.ts";
import { authMiddleware } from "../auth/authMiddleware.ts";

export const validation = new Validation();
export const router = new Router();

router
  .post("/users", validation.validateUserCreation, userCreatorHandler)
  .post("/login", loginHandler)
  .get("/users", authMiddleware, getAllUsersHandler)
  .get("/users/getuser/:username", authMiddleware, getSingleUserHandler)
  .put(
    "/users/dualtransaction/:userId",
    authMiddleware,
    getUserAndUpdateHandler
  )
  .put("/users/:userId", authMiddleware, userUpdaterHandler)
  .delete("/users/:userId", authMiddleware, userDeleterHandler);

export default router;
