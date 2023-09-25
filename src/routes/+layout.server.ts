import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
    const session = await locals.auth.validate()
    if (session) {
        // Fetch the role from the database
        const role = await prisma.roles.findUnique({
            where: {
                id: session.user.role,
            },
        });
        // Add the role name to the user object
        session.user.roleName = role?.name;

        return session.user;
    }
    return session;
}