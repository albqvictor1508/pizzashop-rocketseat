import { Elysia, t } from "elysia";
import { registerRestaurant } from "./routes/register-restaurant";
import { sendAuthLink } from "./routes/send-auth-link";

const app = new Elysia().use(registerRestaurant).use(sendAuthLink);

//ver dps como faz o seed no drizzle

app.listen(3333);
console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
