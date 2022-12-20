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
        const tbodyTable = document.querySelector('#funcionarios > tbody');
        if (!funcionarios) {
            this.showSuccessMessage('Nenhum dado cadastrado!');
            return;
        }

        funcionarios.forEach((funcionario) => {
            const conteudoLinha: Array<HTMLTableCellElement> = [
                colunaTabela(funcionario!.nome),
                colunaTabela(funcionario.cpf),
                colunaTabela(funcionario.email),
                colunaTabela(Link(`atualizar_${funcionario.id}`, `/funcionarios/${funcionario.id}/editar`, '<span class="material-icons">edit </span>', 'btn atualizar') as HTMLElement),
                colunaTabela(Link(`visualizar_${funcionario.id}`, `/funcionarios/${funcionario.id}/visualizar`, '<span class="material-icons">visibility</span>', 'btn visualizar') as HTMLElement),
                colunaTabela(Button(`remover_${funcionario.id}`, '<span class="material-icons">delete_outline</span>', 'btn remover', [{ 'name': 'idFuncionario', 'valor': String(funcionario.id) }]) as HTMLElement),
            ];
            tbodyTable?.append(linhaTabela(conteudoLinha));
        });
    }

    desenharEdit(funcionario: Funcionario): void {
        const id = this.getValueInputElement('id') as HTMLInputElement;
        const nome = this.getValueInputElement('nome') as HTMLInputElement;
        const cpf = this.getValueInputElement('cpf') as HTMLInputElement;
        const email = this.getValueInputElement('email') as HTMLInputElement;
        const eAdministrador = this.getValueInputElement('eAdministrador') as HTMLInputElement;
        const titulo = document.querySelector('h2');
        const sectionSenha  = document.getElementById('section_senha') as HTMLDivElement;
        sectionSenha.hidden = true;
        sectionSenha.childNodes.forEach((filho) =>{
            (filho as HTMLElement).hidden = true;
        });
        titulo!.innerText = 'Editar Funcionário';

        nome.value = String(funcionario.nome);
        nome.focus();

        cpf.value = String(funcionario.cpf);
        cpf.focus();

        email.value = funcionario.email;
        email.focus();        

        eAdministrador.checked = Number(funcionario.eAdministrador) ? true : false; 
    }

    desenharCadastro(): void {
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
        this.aoDispararCadastrar(callback);
    }

    aoDispararVoltar(callback: any): void {
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            callback();
        };

        const voltaFuncionarioBotao = this.getValueInputElement('voltar');

        voltaFuncionarioBotao.addEventListener('click', functionToAct);
    }

    aoDispararRemover(callback: any): void {
        const functionToAct = (elem: MouseEvent): void => {
            elem.preventDefault();
            const botao = (elem.target as HTMLButtonElement).parentNode as HTMLButtonElement;

            callback(botao.getAttribute('idFuncionario'));
        };

        const botoesRemoverFuncionario = document.querySelectorAll('.remover');
        botoesRemoverFuncionario.forEach((botao, i) => {
            const elemento = botoesRemoverFuncionario[i] as HTMLButtonElement;
            elemento.addEventListener('click', functionToAct)
        })
    }

    getValueInputElement(key: string): HTMLInputElement {
        return document.getElementById(`${key}`) as HTMLInputElement;
    }

    pegarDadosDoFormCadastro(): Funcionario {
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
            eAdministrador: Boolean(campoEAdministrador.checked),
            senha: String(campoSenha.value)
        });
    };

    configuraVisualizacao(): void {
        const campoId = document.getElementById('id') as HTMLInputElement;
        const campoNome = document.getElementById('nome') as HTMLInputElement;
        const campoCPF = document.getElementById('cpf') as HTMLInputElement;
        const campoEmail = document.getElementById('email') as HTMLInputElement;
        const campoEAdministrador = document.getElementById('eAdministrador') as HTMLInputElement;
        const campoSenha = document.getElementById('senha') as HTMLInputElement;
        const salvaAlunoBotao = this.getValueInputElement('salvar');
        const cancelarAlunoBotao = this.getValueInputElement('cancelar');
        const titulo = document.querySelector('h2');

        titulo!.innerText = 'Visualizar Funcionário';
        campoId.focus();
        campoId.disabled = true;
        campoNome.focus();
        campoNome.disabled = true;
        campoNome.focus();
        campoCPF.disabled = true;
        campoCPF.focus();
        campoEAdministrador.disabled = true;
        campoEAdministrador.focus();

        campoEmail.disabled = true;
        campoEmail.focus();

        campoSenha.disabled = true;
        campoSenha.focus();

        salvaAlunoBotao.remove();
        cancelarAlunoBotao.remove();
    };

    pegarDadosDoFormEditar(): Funcionario {
        const campoId = Number(location.pathname.split('/')[2]);
        const campoNome = document.getElementById('nome') as HTMLInputElement;
        const campoCPF = document.getElementById('cpf') as HTMLInputElement;
        const campoEmail = document.getElementById('email') as HTMLInputElement;
        const campoEAdministrador = document.getElementById('eAdministrador') as HTMLInputElement;
        const campoSenha = document.getElementById('senha') as HTMLInputElement;
        
        return new Funcionario({
            id: Number(campoId),
            nome: String(campoNome.value),
            cpf: String(campoCPF.value),
            email: String(campoEmail.value),
            eAdministrador: campoEAdministrador.checked,
            senha: String(campoSenha.value),
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