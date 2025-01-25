import { Elysia, t } from "elysia";
import { jwt } from "@elysiajs/jwt";
import { env } from "../env";
import { loadRoutes } from "../utils/load-routes";

//Static<typeof jwtPayload> : converter o objeto do tipo TObject(do typebox) pra um objeto TS

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
	.derive(({ cookie }) => {
		return {
			onSign() {},
		};
	});
await loadRoutes();

app.listen(3333);
console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
