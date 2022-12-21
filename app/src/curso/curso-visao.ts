import { Curso } from "./curso";
import { CursoServico } from "./curso-servico";
import { path } from "../utils/caminho-pagina";
import { colunaTabela, linhaTabela } from "../components/Tabela";
import { Link } from "../components/Ancora";
import { Button } from "../components";
import { formataData } from "../utils/formata-data";
import { Funcionario } from "../funcionario/funcionario";
import Chart from 'chart.js/auto'
import { Aluno } from "../aluno/aluno";
import { AlunoCurso } from "../aluno-curso/aluno-curso";

export class CursoVisao {
    cursoServico: CursoServico;
    chart: Chart | null;
    constructor() {
        this.cursoServico = new CursoServico();
        this.chart = null;
    }

    listarCursosRegex = (): boolean => (/^\/cursos\/?$/i).test(path());
    cadastrarCursosRegex = (): boolean => (/^\/cursos\/novo\/?$/i).test(path());
    atualizarCursosRegex = (): boolean => (/^\/cursos\/\d+\/editar\/?$/).test(path());
    visualizarCursoRegex = (): boolean => (/^\/cursos\/\d+\/visualizar\/?$/).test(path());

    desenhar(cursos: Curso[]): void {
        const tbodyTable = document.querySelector('#curso > tbody');
        if (!cursos) {
            this.showSuccessMessage('Nenhum dado cadastrado!');
            return;
        }

        cursos.forEach((curso) => {
            const conteudoLinha: Array<HTMLTableCellElement> = [
                colunaTabela(curso.codigo),
                colunaTabela(curso.nome),
                colunaTabela(formataData(String(curso.dataInicio))),
                colunaTabela(formataData(String(curso.dataFim))),
                colunaTabela((curso.professor as Funcionario).nome),
                colunaTabela(curso.situacao),
                colunaTabela(Button('Relatório', '<span class="material-icons">insights</span>', 'btn gerar_relatorio', [{ 'name': 'curso-id', 'valor': String(curso.id) }]) as HTMLElement),
                colunaTabela(Link('atualizar', `/cursos/${curso.id}/editar`, '<span class="material-icons">edit </span>', 'btn') as HTMLElement),
                colunaTabela(Link('visualizar', `/cursos/${curso.id}/visualizar`, '<span class="material-icons">visibility</span>', 'btn') as HTMLElement),
                colunaTabela(Button('remover', '<span class="material-icons">delete_outline</span>', 'btn remover', [{ 'name': 'curso-id', 'valor': String(curso.id) }]) as HTMLElement),
            ];
            tbodyTable?.append(linhaTabela(conteudoLinha));
        });
    }

    inicializaSelect(): void {
        var select = document.querySelectorAll('select');
        var selectInstance = M.FormSelect.init(select);
    }

    renderizarGrafico(alunosCursos: AlunoCurso[]): void {
        this.chart?.destroy();
        const modal = document.querySelector('.modal') as HTMLElement;
        M.Modal.init(modal, { opacity: 0.5 });
        M.Modal.getInstance(modal).open();
        modal.style.height = 'auto';
        modal.style.maxHeight = '85%';

        const ctx = document.getElementById('myChart') as HTMLCanvasElement;
        document.getElementById('myChart')?.DOCUMENT_POSITION_CONTAINED_BY;
        const data = {
            labels: [
                'Aprovações Diretas',
                'Aprovações   por   Avaliação   Final',
                'Reprovações   por   Nota',
                'Reprovações por Falta'
            ],
            datasets: [{
                label: 'Relatório de Cursos',
                data: this.processsarResultados(alunosCursos),
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)',
                    'rgb(0 30 16 / 87%)'
                ],
                // hoverOffset: 4
            }]

        };
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: data,

        });
        ctx.style.display = 'block';
        ctx.style.boxSizing = 'border-box';
        ctx.style.height = '474px';
        ctx.style.width = '474px';
    }

    processsarResultados(alunosCursos: AlunoCurso[]): Array<Number> {
        let resultados = [
            /*'aprovados' */ 0,
            /*'aprovados_final' */ 0,
            /*'reprovacao_nota' */ 0,
            /*'reprovacao_falta' */ 0
        ];
        if (alunosCursos != null) {
            (alunosCursos).forEach((ac) => {
                const alunoCurso: AlunoCurso = new AlunoCurso({
                    id: Number(ac.id), matricula: ac.matricula,
                    av1: ac.av1,
                    av2: ac.av2,
                    notaAF: ac.notaAF,
                    faltas: ac.faltas,
                    aluno: ac.aluno,
                    curso: ac.curso
                });
                if (alunoCurso!.av1 || alunoCurso!.av2) {

                    if (alunoCurso.calculaPercentualFaltas() > 25) {
                        resultados[3] = resultados[3] + 1;
                    }
                    else if (alunoCurso.notaAF > 0 && alunoCurso.situacaoAluno() === 'Aprovado') {

                        resultados[1] = resultados[1] + 1;
                    }
                    else if (alunoCurso.situacaoAluno() == 'Reprovado') {
                        resultados[2] = resultados[2] + 1;
                    }
                    else if (alunoCurso.situacaoAluno() == 'Aprovado') {
                        resultados[0] = resultados[0] + 1;
                    }
                }
            });
        }
        console.log(resultados);
        return resultados;
    };
    desenharEdit(curso: Curso): void {
        const id = this.getValueInputElement('id');
        const codigo = this.getValueInputElement('codigo');
        const nome = this.getValueInputElement('nome');
        const situacao = this.getValueInputElement('situacao');
        const inicio = this.getValueInputElement('inicio');
        const termino = this.getValueInputElement('termino');
        const numeroAulas = this.getValueInputElement('numero_aulas');
        const titulo = document.querySelector('h2');

        titulo!.innerText = 'Editar Curso';
        id.value = curso.id.toString();
        codigo.value = curso.codigo.toString();
        nome.value = curso.nome.toString();
        situacao.value = curso.situacao.toString();
        inicio.value = (curso.dataInicio as Date).toString();
        termino.value = (curso.dataFim as Date).toString();
        numeroAulas.value = String(curso.numeroAulas);

        id.focus();
        codigo.focus();
        nome.focus();
        situacao.focus();
        inicio.focus();
        termino.focus();
    }

    popularSelectProfessores(professores: import("../funcionario/funcionario").Funcionario[]) {
        const selectProfessores = document.getElementById('professor');

        professores.forEach((professor) => {
            let novoOption = document.createElement('option');

            novoOption.value = professor.id.toString();
            novoOption.innerHTML = professor.nome;
            selectProfessores?.append(novoOption);
        });

        var select = document.querySelectorAll('select');
        var selectInstance = M.FormSelect.init(select);
    }

    habilitaBotao(): void {
        const buttonEdit = this.getValueInputElement('salvar');
        buttonEdit.disabled = false;
    }

    desabilitaBotao(): void {
        const buttonEdit = this.getValueInputElement('salvar');
        buttonEdit.disabled = true;
    }

    aoDispararCadastrar(callback: any): void {
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            callback();
        };
        const addCursoButton = this.getValueInputElement('salvar');
        addCursoButton.addEventListener('click', functionToAct);
    }

    aoDispararEditar(callback: any): void {
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            callback();
        };

        const saveCursoButton = this.getValueInputElement('salvar');

        saveCursoButton.addEventListener('click', functionToAct);
    }

    aoDispararVoltar(callback: any): void {
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            callback();
        };

        const voltaCursoBotao = this.getValueInputElement('voltar');

        voltaCursoBotao.addEventListener('click', functionToAct);
    }

    aoDispararGraficoCurso(callback: any): void {
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            const botao = (elem.target as HTMLButtonElement).parentNode as HTMLButtonElement;

            callback(botao.getAttribute('curso-id'));
        };

        const botoesRemoverAluno = document.querySelectorAll('.gerar_relatorio');
        botoesRemoverAluno.forEach((botao, i) => {
            const elemento = botoesRemoverAluno[i] as HTMLButtonElement;
            elemento.addEventListener('click', functionToAct)
        })
    }

    aoDispararRemover(callback: any): void {
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            const botao = (elem.target as HTMLElement).parentNode as HTMLElement;
            console.log(botao.getAttribute('curso-id'));

            callback(botao.getAttribute('curso-id'));
        };

        const removeCursoBotao = document.querySelectorAll('.remover');
        removeCursoBotao.forEach((botao, i) => {
            const elemento = removeCursoBotao[i] as HTMLButtonElement;
            elemento.addEventListener('click', functionToAct)
        })
    }

    getValueInputElement(key: string): HTMLInputElement {
        return document.getElementById(`${key}`) as HTMLInputElement;
    }

    pegarDadosDoFormCadastro(): Curso {
        const campoId = document.getElementById('id') as HTMLInputElement;
        const campoCodigo = document.getElementById('codigo') as HTMLInputElement;
        const campoNome = document.getElementById('nome') as HTMLInputElement;
        const campoSituacao = document.getElementById('situacao') as HTMLInputElement;
        const campoNumeroAulas = document.getElementById('numero_aulas') as HTMLInputElement;
        const campoInicio = document.getElementById('inicio') as HTMLInputElement;
        const campoTermino = document.getElementById('termino') as HTMLInputElement;
        const campoProfessor = document.getElementById('professor') as HTMLSelectElement;

        const curso = new Curso({
            id: Number(campoId.value),
            codigo: String(campoCodigo.value),
            nome: String(campoNome.value),
            situacao: String(campoSituacao.value),
            numeroAulas: Number(campoNumeroAulas.value),
            dataInicio: new Date(campoInicio.value),
            dataFim: new Date(campoTermino.value),
            professor: new Funcionario({ id: Number(campoProfessor.value), nome: campoProfessor.options[campoProfessor.selectedIndex].innerHTML.toString(), cpf: '', email: '', eAdministrador: false, senha: '' }),
        });

        return curso;
    };

    pegarDadosDoFormEditar(): Curso {
        return this.pegarDadosDoFormCadastro();
    }

    configuraVisualizacao(): void {
        const id = this.getValueInputElement('id');
        const codigo = this.getValueInputElement('codigo');
        const nome = this.getValueInputElement('nome');
        const situacao = this.getValueInputElement('situacao');
        const numeroAulas = this.getValueInputElement('numero_aulas');
        const inicio = this.getValueInputElement('inicio');
        const termino = this.getValueInputElement('termino');
        const professor = this.getValueInputElement('professor');

        const titulo = document.querySelector('h2');
        const salvaAlunoBotao = this.getValueInputElement('salvar');
        const cancelarAlunoBotao = this.getValueInputElement('cancelar');

        titulo!.innerText = 'Visualizar Aluno';

        id.disabled = true;
        codigo.disabled = true;
        nome.disabled = true;
        situacao.disabled = true;
        inicio.disabled = true;
        termino.disabled = true;
        professor.disabled = true;
        numeroAulas.disabled = true;
        salvaAlunoBotao.remove();
        this.inicializaSelect();
    };

    showSuccessMessage(message: string): void {
        const successMessage = document.getElementById('sucessBar');
        successMessage!.innerText = message;
        successMessage!.className = 'show';
        setTimeout(() => {
            successMessage!.className = successMessage!.className.replace('show', '');
        }, 2000);
    }

    showErrorMessage(message: string): void {
        const errorMessage = document.getElementById('errorBar');
        errorMessage!.innerHTML = String(message);
        errorMessage!.className = 'show';
        setTimeout(() => {
            errorMessage!.className = errorMessage!.className.replace('show', '');
        }, 2000);
    }
}