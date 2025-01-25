import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { env } from "../env";
import cookie from "@elysiajs/cookie";
import { loadRoutes } from "../utils/load-routes";

export const app = new Elysia()
	.use(
		jwt({
			secret: env.JWT_SECRET_KEY,
			schema: t.Object({
				sub: t.String(),
				restaurantId: t.Optional(t.String()),
			}),
		}),
	)
	.use(cookie());
await loadRoutes();

app.listen(3333);
console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
