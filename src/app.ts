import openapi from "@elysiajs/openapi";
import { Elysia } from "elysia";
import { auth } from "./modules/auth";
import { file } from "./modules/file";
import { user } from "./modules/user";

const app = new Elysia().use(openapi()).use(auth).use(file).use(user);

export default app;
