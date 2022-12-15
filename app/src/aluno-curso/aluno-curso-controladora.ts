import { AlunoCurso } from './aluno-curso';
import { ServicoAlunoCurso } from './aluno-curso-servico';
import { VisaoAlunoCurso } from './aluno-curso-visao';
import { carregarPagina } from './../utils/carrega-pagina';
/* eslint-disable-next-line func-style */

export class AlunoCursoController {
    servicoAlunoCurso: ServicoAlunoCurso;
    visaoAlunoCurso: VisaoAlunoCurso;

    constructor() {
        this.servicoAlunoCurso = new ServicoAlunoCurso();
        this.visaoAlunoCurso = new VisaoAlunoCurso();
    }

    async init(): Promise<void> {
        const [main] = document.getElementsByTagName('main');

        if (this.visaoAlunoCurso.listarNotasRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina('/aluno-curso/listar-nota.html');

            await this.insereDadosNaView();
        }
        else if (this.visaoAlunoCurso.cadastroNotasRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina('/aluno-curso/formulario-nota.html');
            await this.visaoAlunoCurso.desenharCadastro();
            this.visaoAlunoCurso.aoDispararCadastrar(this.cadastrar);
        }
        else if ( this.visaoAlunoCurso.atualizarNotasRegex() ) {
            main.innerHTML = await carregarPagina('/aluno-curso/formulario-nota.html');
            const alunoId = this.servicoAlunoCurso.catchUrlId();
            await this.insereDadosNaViewEdit(alunoId);
            this.visaoAlunoCurso.aoDispararEditar(this.editar);
        }
    }

    async insereDadosNaView(): Promise<void> {
        try {
            const aluno: AlunoCurso[] = await this.servicoAlunoCurso.todos(null, null);
            this.visaoAlunoCurso.desenhar(aluno);
        } catch (error: any) {
            this.visaoAlunoCurso.showErrorMessage(error.message);
        }
    }

    async insereDadosNaViewEdit(alunoId: number): Promise<void> {
        try {
            const aluno = await this.servicoAlunoCurso.porAluno(alunoId);

            this.visaoAlunoCurso.desenharEdit(aluno);
        } catch (error: any) {
            this.visaoAlunoCurso.showErrorMessage(error.message);
        }
    }

    cadastrar = async (): Promise<void> => {
        try {
            const nota = this.visaoAlunoCurso.pegarDadosDoFormCadastro();
            await this.servicoAlunoCurso.adicionar(nota);
            this.visaoAlunoCurso.showSuccessMessage('Nota Cadastrada com sucesso!');

            setTimeout(() => {
                location.href = '/aluno-curso';
            }, 2000);
        } catch (error: any) {
            this.visaoAlunoCurso.habilitaBotao();
            this.visaoAlunoCurso.showErrorMessage(error);
        }
    };

    editar = async (): Promise<void> => {
        try {
            const nota = this.visaoAlunoCurso.pegarDadosDoFormEditar();
            this.servicoAlunoCurso.atualizar(nota);

            this.visaoAlunoCurso.showSuccessMessage('Nota editada com sucesso!');

            setTimeout(() => {
                location.href = '/alunos';
            }, 2000);
        } catch (error: any) {
            this.visaoAlunoCurso.habilitaBotao();
            this.visaoAlunoCurso.showErrorMessage(error);
        }
    };

    remover = async ( idNota: string ): Promise<void> => {
        const idNotaForm = idNota.replace( 'del-', '' );

        try {
            await this.servicoAlunoCurso.delete( Number( idNotaForm ) );
            this.visaoAlunoCurso.showSuccessMessage( 'Nota removida com sucesso!' );
            setTimeout( () => {
                location.reload();
            }, 2000 );
        } catch ( error: any ) {
            this.visaoAlunoCurso.showErrorMessage( error.message );
        }
    };


    showErrorMessage(): Promise<void> {
        throw new Error('Notas não encontradas.');
    }
}
