import { Lucia } from "lucia";
import { sqliteAdapter } from "../database/database";

export const lucia = new Lucia(sqliteAdapter, {
	sessionCookie: {
		attributes: {
			secure: true
		}
	},
	getUserAttributes: (attributes) => {
		return {
			username: attributes.username
		};
	}
});

declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	username: string;
}