import { Curso } from "./curso";
import { CursoServico } from "./curso-servico";
import { path } from "../utils/caminho-pagina";

export class CursoVisao {
    cursoServico: CursoServico;
    constructor() {
        this.cursoServico = new CursoServico();
    }

    listarCursosRegex = (): boolean => (/^\/cursos\/?$/i).test(path());
    cadastrarCursosRegex = (): boolean => (/^\/cursos\/novo\/?$/i).test(path());
    atualizarCursosRegex = (): boolean => (/^\/cursos\/\d+\/editar\/?$/).test(path());

    desenhar(cursos: Curso[]): void {
        const tbodyTable = document.querySelector('#curso > tbody');

        if (!cursos) {
            this.showSuccessMessage('Nenhum dado cadastrado!');
            return;
        }

        cursos.forEach((curso) => {
        });
    }

    desenharEdit(curso: Curso): void {
        const codigo = this.getValueInputElement('codigo');
        const nome = this.getValueInputElement('nome');
        const situacao = this.getValueInputElement('situacao');
        const inicio = this.getValueInputElement('inicio');
        const termino = this.getValueInputElement('termino');

        codigo.value = curso.codigo.toString();
        nome.value = curso.nome.toString();
        situacao.value = curso.situacao.toString();
        inicio.value = curso.inicio.toString();
        termino.value = curso.termino.toString();
    }

    habilitaBotao(): void {
        const buttonEdit = this.getValueInputElement('salvar-curso');
        buttonEdit.disabled = false;
    }

    desabilitaBotao(): void {
        const buttonEdit = this.getValueInputElement('salvar-curso');
        buttonEdit.disabled = true;
    }

    aoDispararCadastrar(callback: any): void {
        const addCursoButton = this.getValueInputElement('salvar-curso');
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            callback();
        };

        addCursoButton.addEventListener('click', functionToAct);
    }

    aoDispararEditar(callback: any): void {
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            callback();
        };

        const saveCursoButton = this.getValueInputElement('salvar-curso');
        saveCursoButton.addEventListener('click', functionToAct);
    }

    getValueInputElement(key: string): HTMLInputElement {
        return document.getElementById(`${key}`) as HTMLInputElement;
    }

    pegarDadosDoFormCadastro(): Curso {
        return new Curso({
            id: String(this.getValueInputElement('id')),
            codigo: Number(this.getValueInputElement('codigo')),
            nome: String(this.getValueInputElement('nome')),
            situacao: String(this.getValueInputElement('situacao')),
            inicio: String(this.getValueInputElement('inicio')),
            termino: String(this.getValueInputElement('termino'))
        })
    };

    pegarDadosDoFormEditar(): Curso {
        return new Curso({
            id: String(this.getValueInputElement('id')),
            codigo: Number(this.getValueInputElement('codigo')),
            nome: String(this.getValueInputElement('nome').value),
            situacao: String(this.getValueInputElement('situacao').value),
            inicio: String(this.getValueInputElement('inicio').value),
            termino: String(this.getValueInputElement('termino').value)
        })
    }

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
        errorMessage!.innerText = message;
        errorMessage!.className = 'show';
        setTimeout(() => {
            errorMessage!.className = errorMessage!.className.replace('show', '');
        }, 2000);
    }
}