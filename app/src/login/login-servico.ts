import { LoginError } from './login-error';
import { LoginRepositorio } from './login-repositorio';
import { LoginUsuario } from './login-usuario';
import { SessaoUsuario } from './sessao-usuario';

export class LoginServico {
    loginRepositorio: LoginRepositorio;
    constructor() {
        this.loginRepositorio = new LoginRepositorio();
    }

    async autenticar( loginUsuario: LoginUsuario ): Promise<SessaoUsuario> {
        const todosErrosNoLogin = loginUsuario.validarLogin();

        if ( todosErrosNoLogin.length > 0 ) {
            throw new LoginError( todosErrosNoLogin.join( '\n' ) );
        }
        const sessaoUsuario = await this.loginRepositorio.autenticar( loginUsuario );
        const hojeData = new Date();

        localStorage.setItem(
            'usuario',
            JSON.stringify( {
                item: sessaoUsuario,
                expiry: hojeData.setDate( hojeData.getDate() + 1 ),
            } ),
        );

        return sessaoUsuario;
    }

    async deslogar(): Promise<void> {
        if ( !localStorage.getItem( 'usuario' ) ) {
            throw new LoginError( 'Usuário não logado!' );
        }

        await this.loginRepositorio.deslogar();
        localStorage.clear();
    }
}
