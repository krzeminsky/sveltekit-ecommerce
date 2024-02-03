import { env } from '$env/dynamic/private'
import { getModerators } from '$lib/server/auth/moderators.js'

export const load = async ({ getClientAddress }) => {
    return { moderators: getClientAddress() == env.ADMIN_IP? getModerators() : undefined }
}