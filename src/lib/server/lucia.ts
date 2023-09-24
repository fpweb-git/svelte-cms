import { lucia } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma } from "@lucia-auth/adapter-prisma";
// import { PrismaClient } from "@prisma/client";
import { prisma as PrismaClient } from "$lib/server/prisma";


export const auth = lucia({
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    adapter: prisma(PrismaClient)
});


// import { lucia } from "lucia";
// import prisma from '@lucia-auth/adapter-prisma'
// import { sveltekit } from "lucia/middleware";
// import { dev } from '$app/environment'
// import { prisma as client } from '$lib/server/prisma'

// export const auth = lucia({
//     env: dev ? 'DEV' : 'PROD',
//     adapter: prisma(client),
//     middleware: sveltekit(),
//     // transformDatabaseUser: (userData) => {
//     //     return {
//     //         userId: userData.id,
//     //         username: userData.username,
//     //         email: userData.email
//     //     }
//     // }
// })

// export type Auth = typeof auth