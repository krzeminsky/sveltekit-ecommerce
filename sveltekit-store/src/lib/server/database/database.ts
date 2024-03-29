import { env } from "$env/dynamic/private";
import Database from "better-sqlite3";
import { BetterSqlite3Adapter } from "@lucia-auth/adapter-sqlite";

const db = new Database(`${env.DATA_PATH}/database.db`);
db.pragma('journal_mode = WAL');

const sqliteAdapter = new BetterSqlite3Adapter(db, {
	user: "user",
	session: "session"
});

export { db, sqliteAdapter }
