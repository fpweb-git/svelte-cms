import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()
    console.log(session)
    if (session) {
        return session.user
    }
    return session
}