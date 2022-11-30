export function articleShortDescription(article: any, length = 100) {
    if (!article?.description) return '-';
    return article.description.length > length ? `${article.description.slice(0, length)}...` : article.description
}

export function readingTime(node: HTMLElement) {
    const text = node?.innerText;
    const wpm = 225;
    const words = text.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);
    return time;
}