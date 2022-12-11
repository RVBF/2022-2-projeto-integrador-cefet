import { Curso } from './curso';
import { CursoServico } from './curso-servico';
import { CursoVisao } from './curso-visao';
import { carregarPagina } from '../utils/carrega-pagina';
/* eslint-disable-next-line func-style */

async function loadPage(file: string): Promise<string> {
    const response = await fetch(file);
    return response.text();
}
export class CursoControladora {
    cursoServico: CursoServico;
    cursoVisao: CursoVisao;

    constructor() {
        this.cursoServico = new CursoServico();
        this.cursoVisao = new CursoVisao();
    }

    async init(): Promise<void> {
        const [main] = document.getElementsByTagName('main');

        if (this.cursoVisao.listarCursosRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina("/curso/listar-curso.html");
            await this.insertDataToView();
        }
        else if (this.cursoVisao.cadastrarCursosRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina("/curso/cadastrar-curso.html");
            await this.cadastrar();
        }
    }

    async insertDataToView(): Promise<void> {
        try {
            const curso: Curso[] = await this.cursoServico.todos(10, 1);
            this.cursoVisao.desenhar(curso);
        } catch (error: any) {
            this.cursoVisao.showErrorMessage(error.message);
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
        const aviso = this.cursoVisao.pegarDadosDoFormCadastro();

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
        throw new Error('Cursos não encontrados.');
    }
}
