import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()
    if (session) {
        throw redirect(302, "/")
    }
};

// need implement validation
export const actions: Actions = {
    login: async ({ request, locals }) => {
        const { email, password } = Object.fromEntries(await request.formData()) as { email: string, password: string, }
        try {
            const key = await auth.useKey('email', email, password);
            const user = await auth.getUser(key.userId);
            const session = await auth.createSession(user)

            locals.auth.setSession(session)


        } catch (err) {
            console.error(err)
            return fail(400, { message: 'Something went wrong' })

        }
        throw redirect(302, '/')
    },

}