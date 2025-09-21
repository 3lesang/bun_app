import jwt from "@elysiajs/jwt";
import { Elysia, status } from "elysia";
import { AuthModel } from "./model";
import { Auth } from "./service";

export const auth = new Elysia({ prefix: "/auth" })
	.use(
		jwt({
			name: "jwt",
			secret: process.env.JWT_SECRET ?? "",
		}),
	)
	.post(
		"/admin/signin",
		async ({ body, jwt, cookie: { session } }) => {
			const { identify, password } = body;

			const user = await Auth.signInAdmin({ identify, password });

			if (!user) {
				throw status(
					400,
					"Invalid identify or password" satisfies AuthModel.signInInvalid,
				);
			}

			const token = await jwt.sign({
				type: "admin",
				name: user.name,
			});

			session.value = token;

			return {
				token,
				user: {
					id: user.id,
					name: user.name,
					email: user.email,
				},
			};
		},
		{
			body: AuthModel.signInBody,
			response: {
				200: AuthModel.signInResponse,
				400: AuthModel.signInInvalid,
			},
		},
	)
	.post(
		"/admin/signup",
		async ({ body }) => {
			const { name, email, password } = body;

			const user = await Auth.signUpAdmin({ name, email, password });

			if (!user) {
				throw status(
					400,
					"Unable to create admin user" satisfies AuthModel.signUpInvalid,
				);
			}

			return {
				id: user.id,
				name: user.name,
				email: user.email,
			};
		},
		{
			body: AuthModel.signUpBody,
			response: {
				200: AuthModel.signUpResponse,
				400: AuthModel.signUpInvalid,
			},
		},
	);
