import { carregarPagina } from './carrega-pagina';

export const carregaProibida = async (): Promise<void> => {
    const [main] = document.getElementsByTagName('main');

    main.innerHTML = await carregarPagina('403.html');
};
