import { lucia, type UserSchema } from "lucia";
import { sveltekit } from "lucia/middleware";
import { dev } from "$app/environment";
import { prisma } from "@lucia-auth/adapter-prisma";
import { prisma as PrismaClient } from "$lib/server/prisma";


export const auth = lucia({
    env: dev ? "DEV" : "PROD",
    middleware: sveltekit(),
    adapter: prisma(PrismaClient),
    getUserAttributes: (databaseUser) => {
        return {
            username: databaseUser.username,
            email: databaseUser.email,
            role: databaseUser.roleName
        };
    },
});
