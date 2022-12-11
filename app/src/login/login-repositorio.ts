import { LoginError } from './login-error';
import { LoginUsuario } from './login-usuario';
import { SessaoUsuario } from './sessao-usuario';

const API_LOGIN = 'https://localhost/2022-1-p1-grupo3/api/login';

export class LoginRepositorio {
    async autenticar( loginUsuario: LoginUsuario ): Promise<SessaoUsuario> {
        const response = await fetch( `${API_LOGIN}/autenticar`, {
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify( loginUsuario ),
            headers: {
                'content-type': 'application/json',
            },
        } );
        const responseData = await response.json();

        if ( !response.ok ) {
            throw new LoginError( responseData.error );
        }

        return responseData;
    }

    async deslogar(): Promise<void> {
        const response = await fetch( `${API_LOGIN}/deslogar`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
        } );

        if ( !response.ok ) {
            throw new LoginError( 'Erro ao deslogar!' );
        }
    }
}
