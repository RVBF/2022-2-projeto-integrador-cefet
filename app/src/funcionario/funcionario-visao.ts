import { Funcionario } from "./funcionario";
import { FuncionarioServico } from "./funcionario-servico";
import { path } from "../utils/caminho-pagina";

export class FuncionarioVisao {
    funcionarioServico: FuncionarioServico;
    constructor() {
        this.funcionarioServico = new FuncionarioServico();
    }

    listarFuncionariosRegex = (): boolean => (/^\/funcionarios\/?$/i).test(path());
    cadastrarFuncionariosRegex = (): boolean => (/^\/funcionarios\/novo\/?$/i).test(path());
    atualizarFuncionariosRegex = (): boolean => (/^\/funcionarios\/\d+\/editar\/?$/).test(path());

    desenhar(funcionarios: Funcionario[]): void {
        const tbodyTable = document.querySelector('#funcionario > tbody');

        if (!funcionarios) {
            this.showSuccessMessage('Nenhum dado cadastrado!');
            return;
        }

        funcionarios.forEach((funcionario) => {
        });
    }

    desenharEdit(funcionario: Funcionario): void {
        const nome = this.getValueInputElement('nome');
        const cpf = this.getValueInputElement('cpf');
        const email = this.getValueInputElement('email');

        nome.value = funcionario.nome.toString();
        cpf.value = funcionario.cpf.toString();
        email.value = funcionario.email.toString();
    }

    habilitaBotao(): void {
        const buttonEdit = this.getValueInputElement('salvar-funcionario');
        buttonEdit.disabled = false;
    }

    desabilitaBotao(): void {
        const buttonEdit = this.getValueInputElement('salvar-funcionario');
        buttonEdit.disabled = true;
    }

    aoDispararCadastrar(callback: any): void {
        const addFuncionarioButton = this.getValueInputElement('salvar-funcionario');
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            callback();
        };

        addFuncionarioButton.addEventListener('click', functionToAct);
    }

    aoDispararEditar(callback: any): void {
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            callback();
        };

        const saveFuncionarioButton = this.getValueInputElement('salvar-funcionario');
        saveFuncionarioButton.addEventListener('click', functionToAct);
    }

    getValueInputElement(key: string): HTMLInputElement {
        return document.getElementById(`${key}`) as HTMLInputElement;
    }

    pegarDadosDoFormCadastro(): Funcionario {
        return new Funcionario({
            id: String(this.getValueInputElement('id')),
            nome: String(this.getValueInputElement('nome')),
            cpf: String(this.getValueInputElement('cpf')),
            email: String(this.getValueInputElement('email'))
        })
    };

    pegarDadosDoFormEditar(): Funcionario {
        return new Funcionario({
            id: String(this.getValueInputElement('id')),
            nome: String(this.getValueInputElement('nome').value),
            cpf: String(this.getValueInputElement('cpf').value),
            email: String(this.getValueInputElement('email').value)
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