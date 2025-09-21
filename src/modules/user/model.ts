import { t } from "elysia";

export namespace UserModel {
	export const userSchema = t.Object({
		name: t.String(),
		phone: t.String(),

	});
	export const partialUserSchema = t.Partial(userSchema);
}
