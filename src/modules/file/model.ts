import { t } from "elysia";

export namespace FileModel {
	export const uploadSchema = t.Object({
		files: t.Files({ type: ["image/*"] }),
	});
}
