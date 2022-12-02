import { appConfig } from '../config/config';

export async function carregarPagina(path: any) {
    const featchPage = await fetch(appConfig.baseURL + path).catch(() => undefined);
    if (featchPage!.status >= 400) {
        return null;
    }

    const html = await featchPage!.text();

    document.querySelector('main')!.innerHTML = html;
}
