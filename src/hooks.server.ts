import { auth } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";
import { redirect } from '@sveltejs/kit'
import { sequence } from '@sveltejs/kit/hooks';

export const handle: Handle = sequence(
    // authentication 
    async ({ event, resolve }) => {
        event.locals.auth = auth.handleRequest(event);
        return await resolve(event);
    },

    // role check
    async ({ event, resolve }) => {
        // Check if the user is trying to access an admin route
        if (event.url.pathname.startsWith('/admin')) {
            // console.log(event.locals.auth.validate())
            const session = await event.locals.auth.validate()
            // If the user is not logged in, redirect them to the login page
            if (!session) {
                throw redirect(302, '/');
            }

            // Fetch the role from the database
            const role = await prisma.roles.findUnique({
                where: {
                    id: session.user.role,
                },
            });
            // // If the user is not an admin, redirect them to the login page
            if (role?.name !== 'ADMIN') {
                throw redirect(302, '/');
            }
        }

        return await resolve(event);
    }
);