import { auth } from "$lib/server/lucia";
import type { Handle } from "@sveltejs/kit";

// maybe need to use 'sequence' later if multiple hook

export const handle: Handle = async ({ event, resolve }) => {
    // we can pass `event` because we used the SvelteKit middleware
    event.locals.auth = auth.handleRequest(event);
    return await resolve(event);
};