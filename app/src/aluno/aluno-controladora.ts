import { Aluno } from './aluno';
import { AlunoServico } from './aluno-servico';
import { AlunoVisao } from './aluno-visao';
import { carregarPagina } from '../utils/carrega-pagina';
import { CursoServico } from '../curso/curso-servico';
export class AlunoController {
    cursoServico: CursoServico;
    alunoServico: AlunoServico;
    alunoVisao: AlunoVisao;

    constructor() {
        this.alunoServico = new AlunoServico();
        this.alunoVisao = new AlunoVisao();
        this.cursoServico = new CursoServico();
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
            main.innerHTML = await carregarPagina("/aluno/formulario-aluno.html");
            
            await this.alunoVisao.desenharCadastro();
            this.getProximaMatriculaDisponivel();
            this.alunoVisao.aoDispararCadastrar(this.cadastrar);
            await this.buscarCursos()
        }
        else if (this.alunoVisao.atualizarAlunoRegex()) {
            main.innerHTML = await carregarPagina("/aluno/formulario-aluno.html");

            const alunoId = this.alunoServico.pegaUrlId();
            await this.buscarCursos();
            await this.insereDadosNaViewEdit(alunoId);
            this.alunoVisao.aoDispararEditar(this.editar);
        }
        else if (this.alunoVisao.visualizarAlunoRegex()) {
            main.innerHTML = await carregarPagina("/aluno/formulario-aluno.html");

            const alunoId = this.alunoServico.pegaUrlId();
            await this.buscarCursos();
            await this.insereDadosNaViewVisualiza(alunoId);
            this.alunoVisao.configuraVisualizacao();
            this.alunoVisao.aoDispararVoltar(this.voltar);
        }
    }

    async insereDadosNaView(): Promise<void> {
        try {
            const alunos: Aluno[] = await this.alunoServico.todos(null, null);
            this.alunoVisao.desenhar(alunos);
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

    async getProximaMatriculaDisponivel() : Promise<void>
    {
        try {
            const matricula = await this.alunoServico.getProximaMatriculaDisponivel();
            this.alunoVisao.preencherMatricula(matricula);
        } catch (error) {
            
        }
    }
    
    async insereDadosNaViewVisualiza(alunoId: number): Promise<void> {
        await this.insereDadosNaViewEdit(alunoId);
    }

    
    async buscarCursos () : Promise<void> {
        try {
            const cursos = await this.cursoServico.todos(null, null);
            this.alunoVisao.popularSelectCursos(cursos);
        } catch (error : any) {
            this.alunoVisao.showErrorMessage(error);
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

            // setTimeout(() => {
            //     location.href = '/alunos';
            // }, 2000);
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
            setTimeout( () => {
                location.reload();
            }, 2000 );
        } catch ( error: any ) {
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
