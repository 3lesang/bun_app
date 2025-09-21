import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	phone: text("phone").unique().notNull(),
	email: text("email"),
	password: text("password").notNull(),
});

export const admins = sqliteTable("admins", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	email: text("email").unique().notNull(),
	password: text("password").notNull(),
});

export const products = sqliteTable("products", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").notNull(),
	description: text("description"),
	content: text("content"),
	price: integer("price").notNull(),
	stock: integer("stock").notNull().default(0),
});

export const categories = sqliteTable("categories", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	name: text("name").unique().notNull(),
});

export const productCategories = sqliteTable("product_categories", {
	productId: integer("product_id")
		.references(() => products.id)
		.notNull(),
	categoryId: integer("category_id")
		.references(() => categories.id)
		.notNull(),
});

export const files = sqliteTable("files", {
	id: integer("id").primaryKey({ autoIncrement: true }),
	key: text("key").notNull(),
	name: text("name").notNull(),
	type: text("type").notNull(),
	size: integer("size"),
});
