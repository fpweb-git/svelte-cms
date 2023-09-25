import type { PageServerLoad } from "../../$types";
import { prisma } from '$lib/server/prisma'
import { error } from '@sveltejs/kit';


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
