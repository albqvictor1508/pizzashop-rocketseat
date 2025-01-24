import chalk from "chalk";
import { Elysia } from "elysia";

const app = new Elysia()
	.get("/", () => "Hello Elysia")
	.listen(3000, () => {
		console.log(chalk.blue("HTTP server running!!"));
	});

console.log(
	`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
