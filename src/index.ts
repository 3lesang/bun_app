import openapi from "@elysiajs/openapi";
import { eq } from "drizzle-orm";
import { Elysia, t } from "elysia";
import { db } from "./database/db";
import { users } from "./database/schema";

const app = new Elysia()
app.use(openapi())

// Get all users
app.get("/users", () => db.select().from(users))

  // Get one user
  .get("/users/:id", ({ params: { id } }) =>
    db.select().from(users).where(eq(users.id, Number(id)))
  )

  // Create user
  .post(
    "/users",
    async ({ body }) => {
      const result = await db
        .insert(users)
        .values({ name: body.name, email: body.email })
        .returning();
      return result[0];
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    }
  )

  // Update user
  .put(
    "/users/:id",
    async ({ params: { id }, body }) => {
      const result = await db
        .update(users)
        .set(body)
        .where(eq(users.id, Number(id)))
        .returning();
      return result[0];
    },
    {
      body: t.Partial(
        t.Object({
          name: t.String(),
          email: t.String(),
        })
      ),
    }
  )

  // Delete user
  .delete("/users/:id", async ({ params: { id } }) => {
    const result = await db
      .delete(users)
      .where(eq(users.id, Number(id)))
      .returning();
    return result[0];
  })

  .listen(3000);


console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
