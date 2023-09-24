import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { auth } from "$lib/server/lucia";

export const POST: RequestHandler = async ({ locals }) => {
    const { sessionId } = await locals.auth.validate()
    if (!sessionId) {
        throw redirect(302, "/")
    }
    await auth.invalidateSession(sessionId)
    locals.auth.setSession(null)
    throw redirect(302, '/')

}