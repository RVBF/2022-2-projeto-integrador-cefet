import { LoginError } from './login-error';
import { LoginUsuario } from './login-usuario';
import { SessaoUsuario } from './sessao-usuario';
import { appConfig } from '../config/config';

const API_LOGIN = `${appConfig.api}/login`;

export class LoginRepositorio {
    async autenticar(loginUsuario: LoginUsuario): Promise<SessaoUsuario> {
        const response = await fetch(`${API_LOGIN}/entrar`, {
            method: 'POST',
            body: JSON.stringify(loginUsuario),
   
        });
        const responseData = await response.json();

        if (!response.ok) {
            throw new LoginError(responseData.error);
        }

        return responseData;
    }

    async deslogar(): Promise<void> {
        const response = await fetch(`${API_LOGIN}/sair`, {
            method: 'DELETE',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new LoginError('Erro ao deslogar!');
        }
    }
}
