import Elysia, { t } from "elysia";
import { db } from "../../db/connection";
import { users } from "../../db/schema/users";
import { eq } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { authLinks } from "../../db/schema/auth-links";
import { env } from "../../env";

export const sendAuthLink = new Elysia().post(
	"/auth",
	async ({ body, set }) => {
		const { email } = body;

		const [usersFromEmail] = await db
			.select()
			.from(users)
			.where(eq(users.email, email)); //checar se tem o email no banco, email é unico, ent retorna só 1

		if (!usersFromEmail) {
			throw new Error("User not found");
		}

		const authLinkCode = createId(); //podia ser um base64

		await db.insert(authLinks).values({
			userId: usersFromEmail.id,
			code: authLinkCode,
		});

		//Enviar email

		const authLink = new URL("/auth-links/authenticate", env.API_BASE_URL);

		authLink.searchParams.set("code", authLinkCode);
		authLink.searchParams.set("redirect", env.AUTH_REDIRECT_URL);

		console.log(authLink.toString()); //por enquanto que não envia email
	},
	{ body: t.Object({ email: t.String() }) },
);
