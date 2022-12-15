import { Funcionario } from "./funcionario";
import { FuncionarioServico } from "./funcionario-servico";
import { path } from "../utils/caminho-pagina";
import { colunaTabela, linhaTabela } from "../components/Tabela";
import { Link } from "../components/Ancora";
import { Button } from "../components";

export class FuncionarioVisao {
    funcionarioServico: FuncionarioServico;
    constructor() {
        this.funcionarioServico = new FuncionarioServico();
    }

    listarFuncionariosRegex = (): boolean => (/^\/funcionarios\/?$/i).test(path());
    cadastrarFuncionariosRegex = (): boolean => (/^\/funcionarios\/novo\/?$/i).test(path());
    atualizarFuncionariosRegex = (): boolean => (/^\/funcionarios\/\d+\/editar\/?$/).test(path());
    visualizarFuncionariosRegex = (): boolean => (/^\/funcionarios\/\d+\/visualizar\/?$/).test(path());

    desenhar(funcionarios: Funcionario[]): void {
        const tbodyTable = document.querySelector('#funcionario > tbody');

        if (!funcionarios) {
            this.showSuccessMessage('Nenhum dado cadastrado!');
            return;
        }

        funcionarios.forEach((funcionario) => {
            const conteudoLinha: Array<HTMLTableCellElement> = [
                colunaTabela(funcionario!.nome),
                colunaTabela(funcionario.cpf),
                colunaTabela(funcionario.email),
                colunaTabela(Link('atualizar', `/funcionarios/${funcionario.id}/editar`, '<span class="material-icons">edit </span>', 'btn') as HTMLElement),
                colunaTabela(Link('visualizar', `/funcionarios/${funcionario.id}/visualizar`, '<span class="material-icons">visibility</span>', 'btn') as HTMLElement),
                colunaTabela(Button('remover', '<span class="material-icons">delete_outline</span>', 'btn') as HTMLElement),
            ];
            tbodyTable?.append(linhaTabela(conteudoLinha));
        });
    }

    desenharEdit(funcionario: Funcionario): void {
        const id = this.getValueInputElement('id');
        const nome = this.getValueInputElement('nome');
        const cpf = this.getValueInputElement('cpf');
        const email = this.getValueInputElement('email');
        const eAdministrador = this.getValueInputElement('e_administrador');
        const titulo = document.querySelector('h2');

        titulo!.innerText = 'Editar Funcionário';


        id.value = String(funcionario.id);
        id.focus();
        nome.value = String(funcionario.nome);
        nome.focus();
        cpf.value = String(funcionario.cpf);
        cpf.focus();
        eAdministrador.value = String(funcionario.eAdministrador);
        eAdministrador.focus();
        email.value = funcionario.email;
        email.focus();
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
        const addFuncionarioButton = this.getValueInputElement('salvar');
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

        const saveFuncionarioButton = this.getValueInputElement('salvar');
        saveFuncionarioButton.addEventListener('click', functionToAct);
    }

    getValueInputElement(key: string): HTMLInputElement {
        return document.getElementById(`${key}`) as HTMLInputElement;
    }

    pegarDadosDoFormCadastro(): Funcionario {
        const campoNome = document.getElementById('nome') as HTMLInputElement;
        const campoCPF = document.getElementById('cpf') as HTMLInputElement;
        const campoEmail = document.getElementById('email') as HTMLInputElement;
        const campoEAdministrador = document.getElementById('eAdministrador') as HTMLInputElement;
        const campoSenha = document.getElementById('senha') as HTMLInputElement;
  
  
        return new Funcionario({
           id: 0,
           nome: String(campoNome.value),
           cpf: String(campoCPF.value),
           email: String(campoEmail.value),
           eAdministrador: Boolean(campoEAdministrador.value),
           senha : String(campoSenha.value)
        });
     };
  
     pegarDadosDoFormEditar(): Funcionario {
        const campoId = document.getElementById('id') as HTMLInputElement;
        const campoNome = document.getElementById('nome') as HTMLInputElement;
        const campoCPF = document.getElementById('cpf') as HTMLInputElement;
        const campoEmail = document.getElementById('email') as HTMLInputElement;
        const campoEAdministrador = document.getElementById('eAdministrador') as HTMLInputElement;
        const campoSenha = document.getElementById('senha') as HTMLInputElement;
  
  
        return new Funcionario({
           id: Number(campoId.value),
           nome: String(campoNome.value),
           cpf: String(campoCPF.value),
           email: String(campoEmail.value),
           eAdministrador: Boolean(campoEAdministrador.value),
           senha : null
        });
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