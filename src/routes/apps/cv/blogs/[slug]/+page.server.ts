import { CachePolicy, GQL_AllBlogArticles, GQL_BlogArticle } from '$houdini';
import { errorHandler } from '$lib/core/error';
import type { LoadEvent } from '@sveltejs/kit';

export async function load(event: LoadEvent) {
    const { slug = "" } = event.params
    const article = await GQL_BlogArticle.fetch({
        event,
        policy: CachePolicy.CacheAndNetwork,
        variables: {
            where: {
                slug: { _eq: slug }
            },
            filters: {
                slug: { eq: slug }
            }
        }
    })
        .catch(errorHandler);


    const articles = await GQL_AllBlogArticles.fetch({
        event,
        policy: CachePolicy.CacheAndNetwork,
        variables: {
            where: {
                slug: { _neq: slug }
            },
            filters: {
                slug: { ne: slug }
            }
        }
    })
        .catch(errorHandler);

    return {
        article: article?.data?.cms?.cvArticles?.data[0],
        articles
    };
}