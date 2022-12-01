import { switchRouter } from './app.routes';

export function init() {
    window.addEventListener('hashchange', () => {
        switchRouter();
    });

    window.addEventListener('load', () => {
        if (window.location.hash === '') window.location.hash = '/';
        switchRouter();
    });
}

init();
