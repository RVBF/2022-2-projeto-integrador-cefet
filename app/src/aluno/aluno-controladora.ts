import { Aluno } from './aluno';
import { AlunoServico } from './aluno-servico';
import { AlunoVisao } from './aluno-visao';
import { carregarPagina } from '../utils/carrega-pagina';
/* eslint-disable-next-line func-style */

async function loadPage(file: string): Promise<string> {
    const response = await fetch(file);

    return response.text();
}
export class AlunoController {
    alunoServico: AlunoServico;
    alunoVisao: AlunoVisao;

    constructor() {
        this.alunoServico = new AlunoServico();
        this.alunoVisao = new AlunoVisao();
    }

    async init(): Promise<void> {
        const [main] = document.getElementsByTagName('main');

        if (this.alunoVisao.listarAlunoRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina("/aluno/listar-aluno.html");

            await this.insertDataToView();
        }
        else if (this.alunoVisao.cadastrosRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina("/aluno/cadastrar-aluno.html");
            await this.cadastrar();
        }
    }

    async insertDataToView(): Promise<void> {
        try {
            const aluno: Aluno[] = await this.alunoServico.todos(10, 1);
            this.alunoVisao.desenhar(aluno);
        } catch (error: any) {
            this.alunoVisao.showErrorMessage(error.message);
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
        const aviso = this.alunoVisao.pegarDadosDoFormCadastro();

        try {
            this.alunoVisao.desabilitaBotao();
            // await this.visaoListagem.cad;
            this.alunoVisao.showSuccessMessage('Usuário cadastrado com sucesso!');
            setTimeout(() => {
                // location.href = API'/usuarios';
            }, 2000);
        } catch (error: any) {
            this.alunoVisao.habilitaBotao();
            this.alunoVisao.showErrorMessage(error.message);
        }
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
