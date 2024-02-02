import { env } from '$env/dynamic/private';
import { authorizeModerator, getModeratorPasswordByIp, getModerators } from '$lib/server/auth/moderators.js'
import { error, fail, redirect } from '@sveltejs/kit';
import { Argon2id } from "oslo/password";

export const load = async ({ getClientAddress }) => {
    const modIps = getModerators();
    const incomingIp = getClientAddress();

    if (incomingIp !== env.ADMIN_IP && !modIps.includes(incomingIp)) throw error(404);
}

export const actions = {
    default: async ({ request, getClientAddress }) => {
        const data = await request.formData();
        
        const password = data.get('password') as string;
        if (!password) return fail(400);

        const ip = getClientAddress();

        if (!await authorizeModerator(ip, password)) return fail(400);

        throw redirect(302, "/admin/dashboard");
    }
}