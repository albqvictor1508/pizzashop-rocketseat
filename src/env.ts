import { cleanEnv, str, url } from "envalid";

export const env = cleanEnv(process.env, {
	DATABASE_URL: url(),
	API_BASE_URL: url(),
	AUTH_REDIRECT_URL: url(),
	JWT_SECRET_KEY: str(),
	POSTGRES_USER: str(),
	POSTGRES_PASSWORD: str(),
	POSTGRES_DB: str(),
});
