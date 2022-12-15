import { Aluno } from './aluno';
import { AlunoServico } from './aluno-servico';
import { AlunoVisao } from './aluno-visao';
import { carregarPagina } from '../utils/carrega-pagina';
/* eslint-disable-next-line func-style */

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

            await this.insereDadosNaView();
            this.alunoVisao.aoDispararRemover(this.remover);
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
            await this.insereDadosNaViewEdit(alunoId);
            this.alunoVisao.aoDispararEditar(this.editar);
        }
        else if (this.alunoVisao.visualizarAlunoRegex()) {
            main.innerHTML = await carregarPagina("/aluno/cadastrar-aluno.html");

            const alunoId = this.alunoServico.catchUrlId();
            await this.insereDadosNaViewVisualiza(alunoId);
            this.alunoVisao.configuraVisualizacao();
            this.alunoVisao.aoDispararVoltar(this.voltar);
        }
    }

    async insereDadosNaView(): Promise<void> {
        try {
            const aluno: Aluno[] = await this.alunoServico.todos(null, null);
            this.alunoVisao.desenhar(aluno);
        } catch (error: any) {
            this.alunoVisao.showErrorMessage(error.message);
        }
    }

    async insereDadosNaViewEdit(alunoId: number): Promise<void> {
        try {
            const aluno = await this.alunoServico.porAluno(alunoId);

            this.alunoVisao.desenharEdit(aluno);
        } catch (error: any) {
            this.alunoVisao.showErrorMessage(error.message);
        }
    }
    
    async insereDadosNaViewVisualiza(alunoId: number): Promise<void> {
        await this.insereDadosNaViewEdit(alunoId);
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
        const idAlunoForm = idAluno;

        try {
            await this.alunoServico.delete( Number( idAlunoForm ) );
            this.alunoVisao.showSuccessMessage( 'Aluno removido com sucesso!' );
            // setTimeout( () => {
            //     location.reload();
            // }, 2000 );
        } catch ( error: any ) {
            // this.alunoVisao.habilitaBotao( idAluno );
            this.alunoVisao.showErrorMessage( error.message );
        }
    };

    voltar = async ( idAluno: string ): Promise<void> => {
        const idAlunoForm = idAluno.replace( 'del-', '' );

        try {
            setTimeout( () => {
                location.href = '/alunos';
            }, 2000 );
        } catch ( error: any ) {
            this.alunoVisao.showErrorMessage( error.message );
        }
    };

    showErrorMessage(): Promise<void> {
        throw new Error('Alunos não encontrados.');
    }
}
