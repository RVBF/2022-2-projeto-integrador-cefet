interface LoginUsuarioDTO {
	id: number;
	login: string;
	senha: string;
}

export class LoginUsuario {
    id: number;
    login: string;
    senha: string;

    constructor( { id = 0, login = '', senha = '' }: LoginUsuarioDTO ) {
        this.id = id;
        this.login = login;
        this.senha = senha;
    }

    validarLogin = (): string[] => {
        const arrayErros: string[] = [];

        if ( !this.login ) {
            arrayErros.push( 'Login incorreto!' );
        }

        if ( !this.senha ) {
            arrayErros.push( 'Senha incorreta!' );
        }

        if ( ( /\s/ ).test( this.login ) ) {
            arrayErros.push( 'Login com mais de uma palavra!' );
        }

        return arrayErros;
    };
}
