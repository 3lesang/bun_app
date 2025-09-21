import { t } from "elysia";

export namespace AuthModel {
	export const signInBody = t.Object({
		identify: t.String({ minLength: 3 }),
		password: t.String({ minLength: 6 }),
	});
	export type signInBody = typeof signInBody.static;

	export const signUpBody = t.Object({
		name: t.String({ minLength: 3 }),
		email: t.String({ format: "email" }),
		password: t.String({ minLength: 6 }),
	});
	export type signUpBody = typeof signUpBody.static;

	export const signInResponse = t.Object({
		token: t.String(),
		user: t.Object({
			id: t.Number(),
			name: t.String(),
			email: t.String(),
		}),
	});

	export const signUpResponse = t.Object({
		id: t.Number(),
		name: t.String(),
		email: t.String(),
	});

	export type signInResponse = typeof signInResponse.static;
	export type signUpResponse = typeof signUpResponse.static;

	export const signInInvalid = t.Literal("Invalid identify or password");
	export type signInInvalid = typeof signInInvalid.static;
	export const signUpInvalid = t.Literal("Unable to create admin user");
	export type signUpInvalid = typeof signUpInvalid.static;
}
