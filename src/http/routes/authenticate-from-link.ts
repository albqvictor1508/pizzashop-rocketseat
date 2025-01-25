import { t } from "elysia";
import { db } from "../../db/connection";
import dayjs from "dayjs";
import type { app } from "../server";
import { authLinks } from "../../db/schema";
import { eq } from "drizzle-orm";

//link que vai ser enviado dentro do email pro usuário clicar, direcionando pro front
export const route = (elysia: typeof app) => {
	elysia.get(
		"/auth-links/authenticate",
		async ({ query, jwt, cookie, redirect }) => {
			const { code, redirect: redirectURL } = query;

			const authLinkFromCode = await db.query.authLinks.findFirst({
				where(fields, { eq }) {
					return eq(fields.code, code); //checando se o code da tabela do banco é igual a esse
				},
			});

			if (!authLinkFromCode) {
				throw new Error("Auth link not found.");
			}

			const daysSinceLinkWasCreated = dayjs().diff(
				//retorna a diferença do dia de hoje para o dia que a URL foi criada
				authLinkFromCode.createdAt,
				"days",
			);

			if (daysSinceLinkWasCreated > 7) {
				throw new Error("Auth link expired");
			}

			//checando se o user que ta logando é manager de algum restaurante (regra de negócio)
			const managedRestaurant = await db.query.restaurants.findFirst({
				where(fields, { eq }) {
					return eq(fields.managerId, authLinkFromCode.userId);
				},
			});

			//config do cookie

			cookie.pizzashop_auth.value = await jwt.sign({
				sub: authLinkFromCode.userId,
				restaurantId: managedRestaurant?.id,
			});

			cookie.pizzashop_auth.httpOnly = true;
			cookie.pizzashop_auth.maxAge = 60 * 60 * 24 * 7; //7 dias
			cookie.pizzashop_auth.path = "/";

			//caso o usuário consiga logar, criar o jwt e salvar no cookie, e acessar o front, apaga o link dele
			await db.delete(authLinks).where(eq(authLinks.code, code));

			//usuário ja é redirecionado com cookie e JWT dentro
			redirect(redirectURL);
			return { token: cookie.pizzashop_auth.value };
		},
		{
			query: t.Object({
				code: t.String(),
				redirect: t.String(),
			}),
		},
	);
};
