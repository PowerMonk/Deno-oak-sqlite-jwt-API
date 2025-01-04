import { RouterContext } from "@oak/oak";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByUsername,
  getUserById,
  getUserAndUpdateUser,
} from "../models/modelsMod.ts";
import { generateJWT } from "../auth/authMod.ts";
import { isEmptyObject } from "../utils/utilsMod.ts";

export async function loginHandler(ctx: RouterContext<string>) {
  const { username } = await ctx.request.body.json();
  try {
    const user = getUserByUsername(username);
    if (isEmptyObject(user)) {
      ctx.response.status = 401;
      ctx.response.body = { error: "Invalid username or password" };
      return;
    }
    const token = await generateJWT({ user });
    ctx.response.status = 200;
    ctx.response.body = { token };
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error };
  }
}

export async function userCreatorHandler(ctx: RouterContext<string>) {
  const { username, email } = await ctx.request.body.json();
  try {
    createUser(username, email);
    const token = await generateJWT({ username, email });
    ctx.response.status = 201;
    ctx.response.body = {
      message: `User created successfully! at ${new Date()}`,
      token,
    };
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error: error };
  }
}

export function getAllUsersHandler(ctx: RouterContext<string>) {
  try {
    const users = getAllUsers();
    ctx.response.body = users;
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error };
  }
}

export function getSingleUserHandler(ctx: RouterContext<string>) {
  const username = ctx.params.username;
  try {
    const user = getUserByUsername(username);
    console.log(user);
    if (isEmptyObject(user)) {
      ctx.response.status = 404;
      ctx.response.body = { error: "User not found" };
      return;
    }
    ctx.response.body = { user };
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error };
  }
}

export async function userUpdaterHandler(ctx: RouterContext<string>) {
  const userId = +ctx.params.userId;
  //   const { username, email, userId } = await ctx.request.body.json();
  const { username, email } = await ctx.request.body.json();
  try {
    const userDoesNotExist = getUserByUsername(username);
    if (isEmptyObject(userDoesNotExist)) {
      ctx.response.status = 404;
      ctx.response.body = {
        error: "The user you want to update was not found",
      };
      return;
    }
    updateUser(userId, username, email);
    ctx.response.status = 200;
    ctx.response.body = {
      message: `User updated successfully! at ${new Date()}`,
    };
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error: error };
  }
}

export function userDeleterHandler(ctx: RouterContext<string>) {
  //   const userId = +ctx.params.userId;
  const userId = Number(ctx.params.userId);
  try {
    const userDoesNotExist = getUserById(userId);
    if (isEmptyObject(userDoesNotExist)) {
      ctx.response.status = 404;
      ctx.response.body = {
        error: "The user you want to delete was not found",
      };
      return;
    }
    deleteUser(userId);
    ctx.response.status = 200;
    ctx.response.body = {
      message: `User deleted successfully! at ${new Date()}`,
    };
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error: error };
  }
}

export async function getUserAndUpdateHandler(ctx: RouterContext<string>) {
  const userId = +ctx.params.userId;
  const { email, username } = await ctx.request.body.json();
  try {
    const updatedUser = getUserAndUpdateUser(userId, email, username);
    const userDoesNotExist = getUserByUsername(username);
    if (isEmptyObject(userDoesNotExist)) {
      ctx.response.status = 404;
      ctx.response.body = {
        error: "The user you want to update was not found",
      };
      return;
    }
    ctx.response.status = 200;
    ctx.response.body = {
      updatedUser,
      message: `Dual transaction for getting the user and updating done successfully! at ${new Date()}`,
    };
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error };
  }
}
