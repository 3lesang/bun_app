import { eq } from "drizzle-orm";
import { db } from "@/src/db/db";
import { admins } from "@/src/db/schema";
import type { AuthModel } from "./model";

export const Auth = {
	async signInAdmin({ identify, password }: AuthModel.signInBody) {
		const [admin] = await db
			.select()
			.from(admins)
			.where(eq(admins.email, identify))
			.limit(1);

		if (!admin) return null;

		const valid = await Bun.password.verify(password, admin.password);
		if (!valid) return null;

		return admin;
	},
	async signUpAdmin({ name, email, password }: AuthModel.signUpBody) {
		const [existing] = await db
			.select()
			.from(admins)
			.where(eq(admins.email, email))
			.limit(1);
		if (existing) return null;

		const hashedPassword = await Bun.password.hash(password);

		const [admin] = await db
			.insert(admins)
			.values({
				name,
				email,
				password: hashedPassword,
			})
			.returning();

		return admin;
	},
};
