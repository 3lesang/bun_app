import Elysia from "elysia";
import { r2 } from "@/src/s3/r2";
import { FileModel } from "./model";

export const file = new Elysia({ prefix: "files" })
	.get("/", async () => {
		const data = await r2.list();
		return data.contents;
	})
	.post(
		"/",
		({ body }) => {
			for (const file of body.files) {
				Bun.write(file.name, file);
			}
		},
		{
			body: FileModel.uploadSchema,
		},
	);
