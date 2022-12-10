import { Funcionario } from './funcionario';
import { FuncionarioServico } from './funcionario-servico';
import { FuncionarioVisao } from './funcionario-visao';
import { carregarPagina } from '../utils/carrega-pagina';
/* eslint-disable-next-line func-style */

async function loadPage(file: string): Promise<string> {
    const response = await fetch(file);

    return response.text();
}
export class FuncionarioControladora {
    funcionarioServico: FuncionarioServico;
    funcionarioVisao: FuncionarioVisao;

    constructor() {
        this.funcionarioServico = new FuncionarioServico();
        this.funcionarioVisao = new FuncionarioVisao();
    }

    async init(): Promise<void> {
        const [main] = document.getElementsByTagName('main');

        if (this.funcionarioVisao.listarFuncionariosRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina("/funcionario/listar-funcionario.html");
            await this.insertDataToView();
        }
        else if (this.funcionarioVisao.cadastrarFuncionariosRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina("/funcionario/cadastrar-funcionario.html");
            await this.cadastrar();
        }
    }

    async insertDataToView(): Promise<void> {
        try {
            const funcionario: Funcionario[] = await this.funcionarioServico.todos(10, 1);
            this.funcionarioVisao.desenhar(funcionario);
        } catch (error: any) {
            this.funcionarioVisao.showErrorMessage(error.message);
        }
    }

    // async insertDataToViewEdit(usuarioId: number): Promise<void> {
    //     try {
    //         const usuario = await this.servicoUsuario.pegaUsuario(usuarioId);

    //         this.visaoUsuario.drawEdit(usuario);
    //     } catch (error: any) {
    //         this.visaoUsuario.showErrorMessage(error.message);
    //     }
    // }

    cadastrar = async (): Promise<void> => {
        const aviso = this.funcionarioVisao.pegarDadosDoFormCadastro();

        // try {
        //     this.visaoListagem.desabilitaBotao();
        //     // await this.visaoListagem.cad;
        //     this.visaoListagem.showSuccessMessage('Usuário cadastrado com sucesso!');
        //     setTimeout(() => {
        //         location.href = API'/usuarios';
        //     }, 2000);
        // } catch (error: any) {
        //     this.visaoListagem.habilitaBotao();
        //     this.visaoListagem.showErrorMessage(error.message);
        // }
    };

    // editar = async (): Promise<void> => {
    //     const aviso = this.visaoUsuario.pegarDadosDoFormEditar();

    //     try {
    //         this.visaoUsuario.desabilitaBotao();
    //         await this.servicoUsuario.atualizarUsuario(aviso);

    //         this.visaoUsuario.showSuccessMessage('Usuário atualizado com sucesso!');
    //         setTimeout(() => {
    //             location.href = '/usuarios';
    //         }, 2000);
    //     } catch (error: any) {
    //         this.visaoUsuario.habilitaBotao();
    //         this.visaoUsuario.showErrorMessage(error.message);
    //     }
    // };

    showErrorMessage(): Promise<void> {
        throw new Error('Alunos não encontrados.');
    }
}
