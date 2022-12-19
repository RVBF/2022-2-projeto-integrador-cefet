import { carregarPagina } from '../utils/carrega-pagina';
import { LoginServico } from './login-servico';
import { LoginVisao } from './login-visao';

export class LoginControladora {
    loginServico: LoginServico;
    loginVisao: LoginVisao;

    constructor() {
        this.loginServico = new LoginServico();
        this.loginVisao = new LoginVisao();
    }

    async init(): Promise<void> {
        const [main] = document.getElementsByTagName('main');
        main.innerHTML = await carregarPagina('/login/login.html');
        this.loginVisao.aoDispararLogar(this.logar);
    }

    logar = async (): Promise<void> => {
        const loginUser = this.loginVisao.pegarDadosDoFormLogar();
        console.log(loginUser);
        try {
            await this.loginServico.autenticar(loginUser);
            this.loginVisao.showSuccessMessage('Logado com sucesso!');
            setTimeout(() => {
                location.href = '/aluno';
            }, 2000);
        } catch (error: any) {
            this.loginVisao.showErrorMessage(error.message);
        }
    };

    deslogar = async (): Promise<void> => {
        try {
            await this.loginServico.deslogar();
            this.loginVisao.showSuccessMessage('Deslogado com sucesso!');
            setTimeout(() => {
                location.href = '/';
            }, 2000);
        } catch (error: any) {
            this.loginVisao.showErrorMessage(error.message);
        }
    };
}
