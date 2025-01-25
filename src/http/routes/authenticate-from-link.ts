import { t } from "elysia";
import { db } from "../../db/connection";
import dayjs from "dayjs";
import type { app } from "../server";

//link que vai ser enviado dentro do email pro usuário clicar, direcionando pro front
export const route = (elysia: typeof app) => {
	elysia.get(
		"/auth-links/authenticate",
		async ({ query, jwt: { sign }, cookie }) => {
			const { code, redirect } = query;

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

			const jwt = await sign({
				sub: authLinkFromCode.userId,
				restaurantId: managedRestaurant?.id,
			});

			//usar a função pra configurar o cookie
		},
		{
			query: t.Object({
				code: t.String(),
				redirect: t.String(),
			}),
		},
	);
};
