import { Aluno } from './aluno';
import { ServicoAluno } from './aluno-servico';
import { AlunoVisao } from './aluno-visao';
import { carregarPagina } from '../utils/carrega-pagina';
/* eslint-disable-next-line func-style */

async function loadPage(file: string): Promise<string> {
    const response = await fetch(file);

    return response.text();
}

export class AlunoController {
    servicoAluno: ServicoAluno;
    visaoListagem: AlunoVisao;

    constructor() {
        this.servicoAluno = new ServicoAluno();
        this.visaoListagem = new AlunoVisao();
    }

    async init(): Promise<void> {
        const [main] = document.getElementsByTagName('main');

        if (this.visaoListagem.listarAlunoRegex()) {
            console.log('Entrei na listagem de aluno');
            main.innerHTML = '';
            main.innerHTML = await carregarPagina("aluno/listar-aluno.html");

            await this.insertDataToView();
        }
        else if(this.visaoListagem.cadastrosRegex()) {
            console.log('Entrei no cadastro de aluno');

            main.innerHTML = '';
            main.innerHTML = await carregarPagina( '/aluno/aluno-cadastro.html' );
            await this.cadastrar();


        }
    }

    async insertDataToView(): Promise<void> {
        try {
            const aluno: Aluno[] = await this.servicoAluno.todos(10, 1);
            this.visaoListagem.desenhar(aluno);
        } catch (error: any) {
            this.visaoListagem.showErrorMessage(error.message);
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
        const aviso = this.visaoListagem.pegarDadosDoFormCadastro();

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
