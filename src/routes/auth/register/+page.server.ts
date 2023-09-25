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
    registerUser: async ({ request }) => {
        const { username, email, password, confirmPassword } = Object.fromEntries(await request.formData()) as { username: string, email: string, password: string, confirmPassword: string }
        if (password === confirmPassword) {
            try {
                // Check if there are any users in the database
                const users = await prisma.user.findMany();

                let roleName = 'USER';

                // If there are no users, assign 'ADMIN' role to the first user
                if (users.length === 0) {
                    roleName = 'ADMIN';
                }

                // Check if the role exists in the database
                let role = await prisma.roles.findUnique({
                    where: {
                        name: roleName,
                    },
                });

                // If the role doesn't exist, create it
                if (!role) {
                    role = await prisma.roles.create({
                        data: {
                            name: roleName,
                        },
                    });
                }

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
                                id: role.id
                            }
                        }
                    }
                })
                console.log(role)
            } catch (err) {
                console.error(err)
                return fail(400, { message: 'Something went wrong' })
            }
            throw redirect(302, '/auth/login')
        }
        else {
            console.log('password not match')
            return fail(400, { message: 'password not match' })
        }
    },
}