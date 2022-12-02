import { Aluno } from './aluno.js';
import { ServicoAluno } from './aluno-servico.js';
import { VisaoListagem } from './aluno-visao.js';
import { carregarPagina } from '../utils/carrega-pagina.js';
/* eslint-disable-next-line func-style */

async function loadPage(file: string): Promise<string> {
    const response = await fetch(file);

    return response.text();
}

export class AlunoController {
    servicoAluno: ServicoAluno;
    visaoListagem: VisaoListagem;

    constructor() {
        this.servicoAluno = new ServicoAluno();
        this.visaoListagem = new VisaoListagem();
    }

    async init(): Promise<void> {
        const [main] = document.getElementsByTagName('main');
        console.log(this.visaoListagem.listarAlunoRegex());

        if (document.location.href.search('novo') != -1) {

        }
        else {
            main.innerHTML = await carregarPagina("src/pages/listar-aluno.html");

            await this.insertDataToView();
        }
        // else if (this.visaoListagem.cadastroAlunoCursoRegex()) {
        //     main.innerHTML = await carregarPagina('../../public/aluno-curso/aluno-curso-form.html');

        //     this.visaoListagem.aoDispararCadastrar(this.cadastrar);

        // } 
        // else if (this.visaoListagem.atualizarAlunoCursoRegex()) {
        //     main.innerHTML = await carregarPagina(
        //         '../../public/usuario/aluno-curso-form.html',
        //     );

        //     const alunoId = this.servicoAlunoCurso.pegarUrlId();

        //     await this.insertDataToViewEdit(alunoId);
        //     this.visaoListagem.aoDispararEditar(this.editar);
        // }
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


    // cadastrar = async (): Promise<void> => {
    //     const aviso = this.visaoListagem.pegarDadosDoFormCadastro();

    //     try {
    //         this.visaoListagem.desabilitaBotao();
    //         await this.visaoListagem.cad;
    //         this.visaoListagem.showSuccessMessage('Usuário cadastrado com sucesso!');
    //         setTimeout(() => {
    //             location.href = API'/usuarios';
    //         }, 2000);
    //     } catch (error: any) {
    //         this.visaoListagem.habilitaBotao();
    //         this.visaoListagem.showErrorMessage(error.message);
    //     }
    // };

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
