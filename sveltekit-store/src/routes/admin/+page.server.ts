import { env } from "$env/dynamic/private";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

const adminIps = env.ADMIN_IPS.split(' ');

export const load = (async ({ getClientAddress }) => {
    if (!adminIps.includes(getClientAddress())) throw error(404);
}) satisfies PageServerLoad;