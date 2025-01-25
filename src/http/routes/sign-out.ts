import type { app } from "../server";

export const route = (elysia: typeof app) => {
	elysia.get(
		"/signout",
		async ({ cookie }) => {
			console.log({ cookie: cookie.pizzashop_auth.value });
			cookie.pizzashop_auth.remove();

			return { message: "removeu o cookie" };
		},
		{},
	);
};
