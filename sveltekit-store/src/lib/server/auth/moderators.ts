import { env } from "$env/dynamic/private";
import { Argon2id } from "oslo/password";
import { db } from "../database/database";
import { error } from "@sveltejs/kit";
import { modSessions } from "./mod-sessions";

export async function authorizeModerator(ip: string, password: string) {
    if (ip === env.ADMIN_IP) {
        if (password === env.ADMIN_PASSWORD) {
            modSessions.set(ip, Date.now());

            return true;
        }
    } else {
        const modHash = getModeratorPasswordByIp(ip);
        if (!modHash) return false;

        const res = await new Argon2id().verify(modHash, password);
        if (!res) return false;

        modSessions.set(ip, Date.now());
    }

    return false;
}

export function verifyModeratorSession(ip: string) {
    const session = modSessions.get(ip);

    if (!session) return false;

    return Date.now() - session < 1000 * 60 * 30;
}

export function getModeratorPasswordByIp(ip: string) {
    return db.prepare("SELECT password FROM moderator WHERE ip = ?").pluck(true).get(ip) as string|undefined;
}

export function getModeratorIps() {
    return db.prepare("SELECT ip FROM moderator").pluck(true).all() as string[];
}

export function getModerators() {
    return db.prepare("SELECT id, ip, nickname FROM moderator").all() as { id: number, ip: string, nickname: string }[]
}

export function protectAdminRoute(ip: string) {
    if (!verifyModeratorSession(ip)) throw error(404);

    modSessions.set(ip, Date.now());
}