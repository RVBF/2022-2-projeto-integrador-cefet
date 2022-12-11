export class SessaoUsuario {
    id: number = 0;
    nomeCompleto: string = '';
    setorId: number = 0;
    perfil: string = '';

    constructor() {
        const jsonSessionLogin = JSON.parse( localStorage.getItem( 'usuario' ) || '' );

        this.id = jsonSessionLogin.item.id;
        this.nomeCompleto = jsonSessionLogin.item.nomeCompleto;
        this.setorId = jsonSessionLogin.item.setorId;
        this.perfil = jsonSessionLogin.item.perfil;
    }

    eAdmin = (): boolean => this.perfil === 'Admin';
}
