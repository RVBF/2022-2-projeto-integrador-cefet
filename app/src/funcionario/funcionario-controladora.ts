import { Funcionario } from './funcionario';
import { FuncionarioServico } from './funcionario-servico';
import { FuncionarioVisao } from './funcionario-visao';
import { carregarPagina } from '../utils/carrega-pagina';
/* eslint-disable-next-line func-style */

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
            await this.insereDadosNaView();
        }
        else if (this.funcionarioVisao.cadastrarFuncionariosRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina("/funcionario/cadastrar-funcionario.html");
            await this.cadastrar();
        }
        else if (this.funcionarioVisao.atualizarFuncionariosRegex()) {
            main.innerHTML = await carregarPagina("/funcionario/cadastrar-funcionario.html");

            const funcionarioId = this.funcionarioServico.pegarUrlId();
            await this.insereDadosNaViewEdit(funcionarioId);
            this.funcionarioVisao.aoDispararEditar(this.editar);
        }
    }

    async insereDadosNaView(): Promise<void> {
        try {
            const funcionario: Funcionario[] = await this.funcionarioServico.todos(10, 1);
            this.funcionarioVisao.desenhar(funcionario);
        } catch (error: any) {
            this.funcionarioVisao.showErrorMessage(error.message);
        }
    }

    async insereDadosNaViewEdit(funcionarioId: number): Promise<void> {
        try {
            const funcionario = await this.funcionarioServico.pegaFuncionario(funcionarioId);

            this.funcionarioVisao.desenharEdit(funcionario);
        } catch (error: any) {
            this.funcionarioVisao.showErrorMessage(error.message);
        }
    }


    cadastrar = async (): Promise<void> => {
        try {
            const aluno = this.funcionarioVisao.pegarDadosDoFormCadastro();
            await this.funcionarioServico.adicionar(aluno);
            this.funcionarioVisao.showSuccessMessage('Aluno Cadastrado com sucesso!');

            setTimeout(() => {
                location.href = '/alunos';
            }, 2000);
        } catch (error: any) {
            this.funcionarioVisao.habilitaBotao();
            this.funcionarioVisao.showErrorMessage(error);
        }
    };

    editar = async (): Promise<void> => {
        try {
            const aluno = this.funcionarioVisao.pegarDadosDoFormEditar();
            this.funcionarioServico.atualizar(aluno);

            this.funcionarioVisao.showSuccessMessage('Aluno Editado com sucesso!');

            setTimeout(() => {
                location.href = '/alunos';
            }, 2000);
        } catch (error: any) {
            this.funcionarioVisao.habilitaBotao();
            this.funcionarioVisao.showErrorMessage(error);
        }
    };

    remover = async (idAluno: string): Promise<void> => {
        const idAlunoForm = idAluno.replace('del-', '');

        try {
            // this.funcionarioVisao.desabilitaBotao( idAluno );
            await this.funcionarioServico.delete(Number(idAlunoForm));
            this.funcionarioVisao.showSuccessMessage('Aluno removido com sucesso!');
            setTimeout(() => {
                location.reload();
            }, 2000);
        } catch (error: any) {
            // this.funcionarioVisao.habilitaBotao( idAluno );
            this.funcionarioVisao.showErrorMessage(error.message);
        }
    };

    showErrorMessage(): Promise<void> {
        throw new Error('Alunos não encontrados.');
    }
}
