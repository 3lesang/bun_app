import { S3Client } from "bun";

export const S3_BUCKET = process.env.S3_BUCKET;
export const S3_ENDPOINT = process.env.S3_ENDPOINT;

export const r2 = new S3Client({
	accessKeyId: process.env.S3_ACCESS_KEY,
	secretAccessKey: process.env.S3_SECRET_KEY,
	bucket: S3_BUCKET,
	endpoint: S3_ENDPOINT,
});
