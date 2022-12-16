import { Curso } from "./curso";
import { CursoServico } from "./curso-servico";
import { path } from "../utils/caminho-pagina";
import { colunaTabela, linhaTabela } from "../components/Tabela";
import { Link } from "../components/Ancora";
import { Button } from "../components";
import { formataData } from "../utils/formata-data";

export class CursoVisao {

    cursoServico: CursoServico;

    constructor() {
        this.cursoServico = new CursoServico();
    }

    listarCursosRegex = (): boolean => (/^\/cursos\/?$/i).test(path());
    cadastrarCursosRegex = (): boolean => (/^\/cursos\/novo\/?$/i).test(path());
    atualizarCursosRegex = (): boolean => (/^\/cursos\/\d+\/editar\/?$/).test(path());
    visualizarCursoRegex = (): boolean => (/^\/alunos\/\d+\/visualizar\/?$/).test(path());

    desenhar(cursos: Curso[]): void {
        const tbodyTable = document.querySelector('#curso > tbody');

        if (!cursos) {
            this.showSuccessMessage('Nenhum dado cadastrado!');
            return;
        }
        console.log(cursos);
        cursos.forEach((curso) => {
            const conteudoLinha: Array<HTMLTableCellElement> = [
                colunaTabela(curso.codigo),
                colunaTabela(curso.nome),
                colunaTabela(curso.situacao),
                colunaTabela(formataData(String(curso.dataInicio))),
                colunaTabela(formataData(String(curso.dataFim))),
                colunaTabela(Link('atualizar', `/cursos/${curso.id}/editar`, '<span class="material-icons">edit </span>', 'btn') as HTMLElement),
                colunaTabela(Link('visualizar', `/cursos/${curso.id}/visualizar`, '<span class="material-icons">visibility</span>', 'btn') as HTMLElement),
                colunaTabela(Button('remover', '<span class="material-icons">delete_outline</span>', 'btn', [{ 'name': 'IdCurso', 'valor': String(curso.id) }]) as HTMLElement),
            ];
            tbodyTable?.append(linhaTabela(conteudoLinha));
        });
    }
    inicializaSelect(): void {
        var select = document.querySelectorAll('select');
        var selectInstance = M.FormSelect.init(select);
    }
    desenharEdit(curso: Curso): void {
        const id = this.getValueInputElement('id');
        const codigo = this.getValueInputElement('codigo');
        const nome = this.getValueInputElement('nome');
        const situacao = this.getValueInputElement('situacao');
        const inicio = this.getValueInputElement('inicio');
        const termino = this.getValueInputElement('termino');

        id.value = curso.id.toString();
        codigo.value = curso.codigo.toString();
        nome.value = curso.nome.toString();
        situacao.value = curso.situacao.toString();
        inicio.value = curso.dataInicio.toString();
        termino.value = curso.dataFim.toString();
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

    aoDispararRemover(callback: any): void {
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            const botao = elem.target as HTMLButtonElement;

            console.log(botao.getAttribute('idaluno'));
            callback(botao.getAttribute('aluno-id'));
        };

        const voltaCursoBotao = this.getValueInputElement('remover');

        voltaCursoBotao.addEventListener('click', functionToAct);
    }


    getValueInputElement(key: string): HTMLInputElement {
        return document.getElementById(`${key}`) as HTMLInputElement;
    }

    pegarDadosDoFormCadastro(): Curso {
        const campoId = document.getElementById('id') as HTMLInputElement;
        const campoCodigo = document.getElementById('codigo') as HTMLInputElement;
        const campoNome = document.getElementById('nome') as HTMLInputElement;
        const campoSituacao = document.getElementById('situacao') as HTMLInputElement;
        const campoInicio = document.getElementById('inicio') as HTMLInputElement;
        const campoTermino = document.getElementById('termino') as HTMLInputElement;

        const curso = new Curso({
            id: 0,
            codigo: String(campoCodigo.value),
            nome: String(campoNome.value),
            situacao: String(campoSituacao.value),
            dataInicio: new Date(campoInicio.value),
            dataFim: new Date(campoTermino.value)
        });

        console.log(curso);
        return curso;
    };

    pegarDadosDoFormEditar(): Curso {
        return new Curso({
            id: Number(this.getValueInputElement('id')),
            codigo: String(this.getValueInputElement('codigo')),
            nome: String(this.getValueInputElement('nome').value),
            situacao: String(this.getValueInputElement('situacao').value),
            dataInicio: new Date(this.getValueInputElement('inicio').value),
            dataFim: new Date(this.getValueInputElement('termino').value)
        })
    }

    configuraVisualizacao(): void {
        const id = this.getValueInputElement('id');
        const codigo = this.getValueInputElement('codigo');
        const nome = this.getValueInputElement('nome');
        const situacao = this.getValueInputElement('situacao');
        const inicio = this.getValueInputElement('inicio');
        const termino = this.getValueInputElement('termino');
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
        salvaAlunoBotao.remove();
        cancelarAlunoBotao.remove();
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