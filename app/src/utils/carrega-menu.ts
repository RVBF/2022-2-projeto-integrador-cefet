/* eslint-disable max-len */
import { SessaoUsuario } from '../login/sessao-usuario';

export const carregarMenu = async (path: string): Promise<void> => {
    const icones = document.querySelector('#menu-icones');
    const usuarioLogado = new SessaoUsuario();
    // const listaIcones = [

    // ];

    // listaIcones.forEach( ( botaoMenu ) => {
    //     // eslint-disable-next-line max-len
    //     if (
    //         !usuarioLogado.eAdmin()
    // 		&& ( botaoMenu.nome === 'iconeUsuarios' || botaoMenu.nome === 'iconeSetores' )
    //     ) {
    //         return;
    //     }
    //     if ( icones ) {
    //         icones.innerHTML += path === botaoMenu.nome ? '' : botaoMenu.tag;
    //     }
    // } );
};
