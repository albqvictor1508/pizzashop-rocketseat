import { cleanEnv, url } from "envalid";

export const env = cleanEnv(process.env, {
	DATABASE_URL: url(),
	API_BASE_URL: url(),
	AUTH_REDIRECT_URL: url(),
});
