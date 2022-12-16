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
            this.funcionarioVisao.aoDispararRemover(this.remover);
        }
        else if (this.funcionarioVisao.cadastrarFuncionariosRegex()) {
            main.innerHTML = '';
            main.innerHTML = await carregarPagina("/funcionario/formulario-funcionario.html");
            
            await this.funcionarioVisao.desenharCadastro();
            this.funcionarioVisao.aoDispararCadastrar(this.cadastrar);
        }
        else if (this.funcionarioVisao.atualizarFuncionariosRegex()) {
            main.innerHTML = await carregarPagina("/funcionario/formulario-funcionario.html");

            const funcionarioId = this.funcionarioServico.pegaUrlId();
            await this.insereDadosNaViewEdit(funcionarioId);
            this.funcionarioVisao.aoDispararEditar(this.editar);
        }
        else if (this.funcionarioVisao.visualizarFuncionariosRegex()) {
            main.innerHTML = await carregarPagina("/aluno/formulario-aluno.html");

            const funcionarioId = this.funcionarioServico.pegaUrlId();
            await this.insereDadosNaViewVisualiza(funcionarioId);
            this.funcionarioVisao.configuraVisualizacao();
            this.funcionarioVisao.aoDispararVoltar(this.voltar);
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
            const funcionario = await this.funcionarioServico.porFuncionario(funcionarioId);

            this.funcionarioVisao.desenharEdit(funcionario);
        } catch (error: any) {
            this.funcionarioVisao.showErrorMessage(error.message);
        }
    }

    async insereDadosNaViewVisualiza(funcionarioId: number): Promise<void> {
        await this.insereDadosNaViewEdit(funcionarioId);
    }

    cadastrar = async (): Promise<void> => {
        try {
            const funcionario = this.funcionarioVisao.pegarDadosDoFormCadastro();
            await this.funcionarioServico.adicionar(funcionario);
            this.funcionarioVisao.showSuccessMessage('Funcionário cadastrado com sucesso!');

            setTimeout(() => {
                location.href = '/funcionarios';
            }, 2000);
        } catch (error: any) {
            this.funcionarioVisao.habilitaBotao();
            this.funcionarioVisao.showErrorMessage(error);
        }
    };

    editar = async (): Promise<void> => {
        try {
            const funcionario = this.funcionarioVisao.pegarDadosDoFormEditar();
            this.funcionarioServico.atualizar(funcionario);

            this.funcionarioVisao.showSuccessMessage('Funcionário editado com sucesso!');

            setTimeout(() => {
                location.href = '/funcionarios';
            }, 2000);
        } catch (error: any) {
            this.funcionarioVisao.habilitaBotao();
            this.funcionarioVisao.showErrorMessage(error);
        }
    };

    remover = async (idFuncionario: string): Promise<void> => {
        const idFuncionarioForm = idFuncionario.replace('del-', '');

        try {
            await this.funcionarioServico.delete(Number(idFuncionarioForm));
            this.funcionarioVisao.showSuccessMessage('Funcionário removido com sucesso!');
            // setTimeout(() => {
            //     location.reload();
            // }, 2000);
        } catch (error: any) {
            // this.funcionarioVisao.habilitaBotao( idAluno );
            this.funcionarioVisao.showErrorMessage(error.message);
        }
    };

    voltar = async ( idFuncionario: string ): Promise<void> => {
        const idFuncionarioForm = idFuncionario.replace( 'del-', '' );

        try {
            setTimeout( () => {
                location.href = '/funcionarios';
            }, 2000 );
        } catch ( error: any ) {
            this.funcionarioVisao.showErrorMessage( error.message );
        }
    };

    showErrorMessage(): Promise<void> {
        throw new Error('Funcionários não encontrados.');
    }
}
