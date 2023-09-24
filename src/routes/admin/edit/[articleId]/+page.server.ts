import type { PageServerLoad } from "../../$types";
import type { Actions } from '@sveltejs/kit';
import { prisma } from '$lib/server/prisma'
import { fail } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
    const getArticle = async () => {
        const id = params.articleId
        const article = await prisma.article.findUnique({
            where: {
                id
            }
        })
        if (!article) {
            throw error(404, 'Article not found')
        }
        return article
    }
    return {
        article: getArticle()
    }
};

export const actions: Actions = {
    updateArticle: async ({ request, params }) => {
        const id = params.articleId
        const { title, content } = Object.fromEntries(await request.formData()) as { title: string, content: string }
        try {
            await prisma.article.update({
                where: {
                    id
                },
                data: {
                    title,
                    content
                }
            })
        }
        catch (err) {
            console.log(err)
            return fail(500, { message: 'could not update the article' })
        }
        throw redirect(303, '/admin')
    },
}