import { carregarPagina } from './carrega-pagina';

export const carregaProibida = async (): Promise<void> => {
    const [ main ] = document.getElementsByTagName( 'main' );

    main.innerHTML = await carregarPagina( '/public/403.html' );
};
