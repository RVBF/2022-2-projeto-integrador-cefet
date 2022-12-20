import { Curso } from './curso';
import { CursoServico } from './curso-servico';
import { CursoVisao } from './curso-visao';
import { carregarPagina } from '../utils/carrega-pagina';
import { FuncionarioServico } from '../funcionario/funcionario-servico';
/* eslint-disable-next-line func-style */

async function loadPage(file: string): Promise<string> {
    const response = await fetch(file);
    return response.text();
}
export class CursoControladora {
    cursoServico: CursoServico;
    funcionarioServico : FuncionarioServico;
    cursoVisao: CursoVisao;

    constructor() {
        this.cursoServico = new CursoServico();
        this.cursoVisao = new CursoVisao();
        this.funcionarioServico = new FuncionarioServico();
    }

    async init(): Promise<void> {
        const [main] = document.getElementsByTagName('main');

        if (this.cursoVisao.listarCursosRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina("/curso/listar-curso.html");
            await this.insereDadosNaView();
            this.cursoVisao.aoDispararRemover(this.remover);

        }
        else if (this.cursoVisao.cadastrarCursosRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina("/curso/formulario-curso.html");
            this.cursoVisao.inicializaSelect();
            this.cursoVisao.aoDispararCadastrar(this.cadastrar);
            await this.buscarProfessores()

        }
        else if (this.cursoVisao.atualizarCursosRegex()) {
            main.innerHTML = await carregarPagina("/curso/formulario-curso.html");

            const cursoId = this.cursoServico.pegaUrlId();
            await this.insereDadosNaViewEdit(cursoId);
            this.cursoVisao.inicializaSelect();
            this.cursoVisao.aoDispararEditar(this.editar);
            await this.buscarProfessores()

        }
        else if (this.cursoVisao.visualizarCursoRegex()) {
            main.innerHTML = await carregarPagina("/curso/formulario-curso.html");

            const cursoId = this.cursoServico.pegaUrlId();
            await this.insereDadosNaViewVisualiza(cursoId);
            await this.buscarProfessores();
            this.cursoVisao.configuraVisualizacao();;
            this.cursoVisao.aoDispararVoltar(this.voltar);
        }
    }

    async insereDadosNaView(): Promise<void> {
        try {
            const alunos: Curso[] = await this.cursoServico.todos(null, null);
            this.cursoVisao.desenhar(alunos);
        } catch (error: any) {
            this.cursoVisao.showErrorMessage(error.message);
        }
    }

    async insereDadosNaViewEdit(cursoId: number): Promise<void> {
        try {
            const curso = await this.cursoServico.porCurso(cursoId);

            this.cursoVisao.desenharEdit(curso);
        } catch (error: any) {
            this.cursoVisao.showErrorMessage(error.message);
        }
    }

    async insereDadosNaViewVisualiza(alunoId: number): Promise<void> {
        await this.insereDadosNaViewEdit(alunoId);
    }

    async buscarProfessores () : Promise<void> {
        try {
            const profesores = await this.funcionarioServico.todosProfessores();
            this.cursoVisao.popularSelectProfessores(profesores);
        } catch (error : any) {
            this.cursoVisao.showErrorMessage(error);
        }
    }

    cadastrar = async (): Promise<void> => {
        try {
            const curso = this.cursoVisao.pegarDadosDoFormCadastro();
            console.log(curso);

            await this.cursoServico.adicionar(curso);
            this.cursoVisao.showSuccessMessage('Curso Cadastrado com sucesso!');

            setTimeout(() => {
                location.href = '/cursos';
            }, 2000);
        } catch (error: any) {
            this.cursoVisao.habilitaBotao();
            this.cursoVisao.showErrorMessage(error);
        }
    };
    editar = async (): Promise<void> => {
        try {
            const curso = this.cursoVisao.pegarDadosDoFormEditar();
            this.cursoServico.atualizar(curso);

            this.cursoVisao.showSuccessMessage('Curso Editado com sucesso!');

            setTimeout(() => {
                location.href = '/cursos';
            }, 2000);
        } catch (error: any) {
            this.cursoVisao.habilitaBotao();
            this.cursoVisao.showErrorMessage(error);
        }
    };

    remover = async (idCurso: string): Promise<void> => {
        const idCursoForm = idCurso;
        console.log(idCursoForm);
        try {
            await this.cursoServico.delete(Number(idCursoForm));
            this.cursoVisao.showSuccessMessage('Curso removido com sucesso!');
            setTimeout( () => {
                location.reload();
            }, 2000 );
        } catch (error: any) {
            this.cursoVisao.showErrorMessage(error.message);
        }
    };

    voltar = async (idCurso: string): Promise<void> => {
        const idCursoForm = idCurso.replace('del-', '');

        try {
            setTimeout(() => {
                location.href = '/cursos';
            }, 2000);
        } catch (error: any) {
            this.cursoVisao.showErrorMessage(error.message);
        }
    };
    showErrorMessage(): Promise<void> {
        throw new Error('Cursos não encontrados.');
    }
}
