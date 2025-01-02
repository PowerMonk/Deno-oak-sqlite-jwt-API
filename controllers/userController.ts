import { RouterContext } from "@oak/oak";
import {
  createUser,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserByUsername,
  getUserAndUpdateUser,
} from "../models/modelsMod.ts";
import { generateJWT } from "../auth/authMod.ts";

export async function loginHandler(ctx: RouterContext<string>) {
  const { username } = await ctx.request.body.json();
  try {
    const user = getUserByUsername(username);
    if (!user) {
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
    //  The response body is destructured as { user } to create a properly structured JSON response
    //  with a named "user" property, following REST API conventions and making the response
    //  more explicit for clients consuming the API.
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
