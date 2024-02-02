import { verifyModeratorSession } from '$lib/server/auth/moderators';
import { error } from '@sveltejs/kit';

export const handle = async ({ resolve, event }) => {
    if (event.route.id?.includes('/admin/') && !verifyModeratorSession(event.getClientAddress())) throw error(404);
    
    return await resolve(event);
}