import { CachePolicy, GQL_AllBlogArticles } from '$houdini';
import { errorHandler } from '$lib/core/error';

export async function load(event: any) {
    const articles = await GQL_AllBlogArticles.fetch({
        event,
        policy: CachePolicy.NetworkOnly,
        variables: {
            // created_at: "desc"
        }
    })
        .catch(errorHandler);

    return {
        articles
    };
}