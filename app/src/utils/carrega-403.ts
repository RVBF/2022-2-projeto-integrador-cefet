import { carregarPagina } from './carrega-pagina';

export const carregaProibida = async (): Promise<void> => {
    const [main] = document.getElementById('root');

    main.innerHTML = await carregarPagina('../pages/403.html');
};
