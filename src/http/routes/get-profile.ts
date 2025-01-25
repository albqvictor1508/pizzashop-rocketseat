import { db } from "../../db/connection";
import type { app } from "../server";

export const route = (elysia: typeof app) => {
	elysia.get("/me", async ({ cookie, jwt }) => {
		return { token: cookie.pizzashop_auth.value }; //resolver o pq não to conseguindo acessar o cookie, provavel com o derive
	});
};

/* 
		const payload = await jwt.verify(cookie.pizzashop_auth.value);
		console.log(payload);

		if (!payload) {
			throw new Error("Unauthorized");
		}

		const user = await db.query.users.findFirst({
			where(fields, { eq }) {
				return eq(fields.id, payload.sub);
			},
		});

		if (!user) {
			throw new Error("User not found.");
		}

		return user;
*/
