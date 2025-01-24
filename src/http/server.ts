import { Elysia } from "elysia";

const app = new Elysia().get("/", () => "Hello Elysia").listen(3000, () => {
  console.log("HTTP server running!");
});

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
