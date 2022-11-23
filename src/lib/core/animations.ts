
import { sineOut, bounceIn, bounceOut, bounceInOut, quintIn, quintOut, quintInOut, elasticInOut } from 'svelte/easing';

export const customTransition = (arg: any) => {
    return {
        css: (t: number) => {
            return `transform: scale(${t});`;
        },
        easing: quintIn,
        duration: 650
    };
};