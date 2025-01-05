import { RouterContext } from "@oak/oak";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserAndUpdateUser,
} from "../models/modelsMod.ts";
import { generateJWT } from "../auth/authMod.ts";
import {
  checkUserExistsByUsername,
  checkUserExistsById,
} from "../utils/utilsMod.ts";

export async function loginHandler(ctx: RouterContext<string>) {
  const { username } = await ctx.request.body.json();
  try {
    const user = checkUserExistsByUsername(ctx, username);
    if (!user) return;

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
    const user = checkUserExistsByUsername(ctx, username);
    if (!user) return;
    // console.log(user);

    ctx.response.body = { user };
  } catch (error) {
    console.log(error);
    ctx.response.status = 400;
    ctx.response.body = { error };
  }
}

export async function userUpdaterHandler(ctx: RouterContext<string>) {
  const userId = Number(ctx.params.userId);
  //   const { username, email, userId } = await ctx.request.body.json();
  const { username, email } = await ctx.request.body.json();
  try {
    const user = checkUserExistsByUsername(ctx, username);
    if (!user) return;

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
  const userId = Number(ctx.params.userId);
  try {
    const user = checkUserExistsById(ctx, userId);
    if (!user) return;

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
  const userId = Number(ctx.params.userId);
  const { username, email } = await ctx.request.body.json();
  try {
    const user = checkUserExistsById(ctx, userId);
    if (!user) return;

    const updatedUser = getUserAndUpdateUser(userId, username, email);
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
