export function articleShortDescription(article: any, length = 100) {
    if (!article?.description) return '-';
    return article.description.length > length ? `${article.description.slice(0, length)}...` : article.description
}