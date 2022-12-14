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
            await this.alunoVisao.desenharCadastro();
            this.alunoVisao.aoDispararCadastrar(this.cadastrar);
        }
        else if (this.alunoVisao.atualizarAlunoRegex()) {
            main.innerHTML = await carregarPagina("/aluno/cadastrar-aluno.html");

            const alunoId = this.alunoServico.catchUrlId();
            await this.insertDataToViewEdit(alunoId);
            this.alunoVisao.aoDispararEditar(this.editar);
        }
    }

    async insertDataToView(): Promise<void> {
        try {
            const aluno: Aluno[] = await this.alunoServico.todos(null, null);
            this.alunoVisao.desenhar(aluno);
        } catch (error: any) {
            this.alunoVisao.showErrorMessage(error.message);
        }
    }

    async insertDataToViewEdit(alunoId: number): Promise<void> {
        try {
            const aluno = await this.alunoServico.porAluno(alunoId);

            this.alunoVisao.desenharEdit(aluno);
        } catch (error: any) {
            this.alunoVisao.showErrorMessage(error.message);
        }
    }

    cadastrar = async (): Promise<void> => {
        try {
            const aluno = this.alunoVisao.pegarDadosDoFormCadastro();
            await this.alunoServico.adicionar(aluno);

            this.alunoVisao.showSuccessMessage('Aluno Cadastrado com sucesso!');

            setTimeout(() => {
                location.href = '/alunos';
            }, 2000);
        } catch (error: any) {
            this.alunoVisao.habilitaBotao();
            this.alunoVisao.showErrorMessage(error);
        }
    };

    editar = async (): Promise<void> => {
        try {
            const aluno = this.alunoVisao.pegarDadosDoFormEditar();
            this.alunoServico.atualizar(aluno);

            this.alunoVisao.showSuccessMessage('Aluno Editado com sucesso!');

            setTimeout(() => {
                location.href = '/alunos';
            }, 2000);
        } catch (error: any) {
            this.alunoVisao.habilitaBotao();
            this.alunoVisao.showErrorMessage(error);
        }
    };

    remover = async ( idAluno: string ): Promise<void> => {
        const idAlunoForm = idAluno.replace( 'del-', '' );

        try {
            // this.alunoVisao.desabilitaBotao( idAluno );
            await this.alunoServico.delete( Number( idAlunoForm ) );
            this.alunoVisao.showSuccessMessage( 'Aluno removido com sucesso!' );
            setTimeout( () => {
                location.reload();
            }, 2000 );
        } catch ( error: any ) {
            // this.alunoVisao.habilitaBotao( idAluno );
            this.alunoVisao.showErrorMessage( error.message );
        }
    };

    showErrorMessage(): Promise<void> {
        throw new Error('Alunos não encontrados.');
    }
}
