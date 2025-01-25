import { app } from "../http/server";

export async function loadRoutes() {
	const glob = new Bun.Glob("src/http/routes/*.ts"); //todas as pastas e todos os arquivos TS aqui dentro

	for await (const file of glob.scan()) {
		const { route } = await import(`../../${file}`);

		route(app);
	}
}
