import { browser } from "$app/environment";

export function scrollTop() {
    if (browser) {
        const args: any = {
            top: 0,
            left: 0,
            behavior: 'smooth'
        }

        window.scroll(args);
        document.body.scrollIntoView(args);
        document.getElementsByClassName('main-content')[0]?.scrollIntoView(args);
    }
}