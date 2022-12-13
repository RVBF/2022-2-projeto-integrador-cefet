import { Aluno } from './aluno';
import { AlunoServico } from './aluno-servico';
import { AlunoVisao } from './aluno-visao';
import { carregarPagina } from '../utils/carrega-pagina';
import { AlunoError } from './aluno-error';
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

    cadastrar = async (): Promise<void> => {
        this.alunoVisao.desenharCadastro();
        
        
        try {
            this.alunoVisao.aoDispararCadastrar(() => {
                const aluno = this.alunoVisao.pegarDadosDoFormCadastro();
                this.alunoServico.adicionar(aluno);

                // setTimeout(() => {
                //     location.href = '/aluno';
                // }, 2000);
            });
        } catch (error: any) {
            console.error(error);
            // this.alunoVisao.habilitaBotao();
            this.alunoVisao.showErrorMessage(error);
        }
    };

    editar = async (): Promise<void> => {
        const aluno = this.alunoVisao.pegarDadosDoFormEditar();

        try {
            this.alunoVisao.aoDispararEditar(() =>{
                this.alunoVisao.desabilitaBotao();
                this.alunoServico.atualizar(aluno);
    
                this.alunoVisao.showSuccessMessage('Aluno atualizado com sucesso!');
                // setTimeout(() => {
                //     location.href = '/aluno';
                // }, 2000);
            })
        } catch (error: any) {
            this.alunoVisao.habilitaBotao();
            this.alunoVisao.showErrorMessage(error.message);
        }
    };

    showErrorMessage(): Promise<void> {
        throw new Error('Alunos não encontrados.');
    }
}
