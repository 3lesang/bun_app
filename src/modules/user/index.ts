import jwt from "@elysiajs/jwt";
import { eq } from "drizzle-orm";
import { Elysia } from "elysia";
import { db } from "@/src/db/db";
import { users } from "@/src/db/schema";
import { UserModel } from "./model";

export const user = new Elysia({ prefix: "/users" })
	.use(
		jwt({
			name: "jwt",
			secret: process.env.JWT_SECRET ?? "",
		}),
	)
	.get("/", ({ cookie: { session } }) => {
		console.log(session.value);
		return db.select().from(users);
	})
	.get("/:id", ({ params: { id } }) =>
		db
			.select()
			.from(users)
			.where(eq(users.id, Number(id))),
	)
	.put(
		"/:id",
		async ({ params: { id }, body }) => {
			const [result] = await db
				.update(users)
				.set(body)
				.where(eq(users.id, Number(id)))
				.returning();
			return result;
		},
		{ body: UserModel.partialUserSchema },
	)
	.delete("/:id", async ({ params: { id } }) => {
		const [result] = await db
			.delete(users)
			.where(eq(users.id, Number(id)))
			.returning();
		return result;
	});
