import type { app } from "../server";

export const route = (elysia: typeof app) => {
	elysia.get("/test", () => {
		return "testando load routes";
	});
};
