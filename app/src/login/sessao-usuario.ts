export class SessaoUsuario {
    id: number = 0;
    nomeCompleto: string = '';
    perfil: string = '';

    constructor() {
        const jsonSessionLogin = JSON.parse(localStorage.getItem('usuario') || '');

        this.id = jsonSessionLogin.item.id;
        this.nomeCompleto = jsonSessionLogin.item.nomeCompleto;
        this.perfil = jsonSessionLogin.item.perfil;
    }

    eAdmin = (): boolean => this.perfil === 'Admin';
}
