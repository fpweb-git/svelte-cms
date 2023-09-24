import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { prisma } from '$lib/server/prisma'
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
    registerUser: async ({ request }) => {
        const { username, email, password, confirmPassword } = Object.fromEntries(await request.formData()) as { username: string, email: string, password: string, confirmPassword: string }
        // console.log(username, email, password, confirmPassword)
        if (password === confirmPassword) {
            try {
                await auth.createUser({
                    key: {
                        providerId: 'email',
                        providerUserId: email,
                        password
                    },
                    attributes: {
                        username,
                        email,
                        role: {
                            connect: {
                                id: '331034f6-9090-49d2-999c-e34a8ce3499c'
                            }
                        }
                    }
                })

            } catch (err) {
                console.error(err)
                return fail(400, { message: 'Something went wrong' })

            }
        }
        else {
            console.log('password not match')
            return fail(400, { message: 'password not match' })
        }
    },

}