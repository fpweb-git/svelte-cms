import type { Actions } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
    return {
        articles: await prisma.article.findMany()
    }
}


export const actions: Actions = {
    createArticle: async ({ request }) => {
        const { title, content } = Object.fromEntries(await request.formData()) as { title: string, content: string }
        console.log(content)
        try {
            await prisma.article.create({
                data: {
                    title,
                    content
                }
            })
        }
        catch (err) {
            console.log(err)
            return fail(500, { message: 'could not create the article' })
        }
        return {
            status: 201,
        }
    },
    deleteArticle: async ({ url }) => {
        const id = url.searchParams.get('id')
        if (!id) {
            return fail(400, { message: 'Invalid request' })
        }
        try {
            await prisma.article.delete({
                where: {
                    id
                }
            })
        }
        catch (err) {
            console.log(err)
            return fail(500, { message: 'could not delete the article' })
        }
        return {
            status: 200,
        }
    }
}