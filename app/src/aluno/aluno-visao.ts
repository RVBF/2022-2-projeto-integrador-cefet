import { Aluno } from "./aluno";
import { AlunoServico } from "./aluno-servico";
import { path } from "../utils/caminho-pagina";

export class AlunoVisao {
   servicoAluno: AlunoServico;
   constructor() {
      this.servicoAluno = new AlunoServico();
   }
   listarAlunoRegex = (): boolean => (/^\/alunos\/?$/i).test(path());
   cadastrosRegex = (): boolean => (/^\/alunos\/novo\/?$/i).test(path());
   atualizarAlunoRegex = (): boolean => (/^\/alunos\/\d+\/editar\/?$/).test(path());

   desenhar(alunos: Aluno[]): void {
      const tbodyTable = document.querySelector('#aluno > tbody');

      if (!alunos) {
         this.showSuccessMessage('Nenhum dado cadastrado!');
         return;
      }

      alunos.forEach((aluno) => {
         // const conteudoLinha: Array<string> = [aluno.matricula.toString(), aluno!.nome, aluno.cpf.toString(), aluno.telefone.toString(), aluno.email.toString()]
         // tbodyTable?.append(linhaTabela(conteudoLinha, [], []));
      });
   }

   desenharEdit(aluno: Aluno): void {
      const matricula = this.getValueInputElement('matricula');
      const nome = this.getValueInputElement('nome');
      const cpf = this.getValueInputElement('cpf');
      const telefone = this.getValueInputElement('telefone');
      const email = this.getValueInputElement('email');

      matricula.value = aluno.matricula.toString();
      nome.value = aluno.nome.toString();
      cpf.value = aluno.cpf.toString();
      telefone.value = aluno.telefone.toString();
      email.value = String(aluno.id);
   }

   desenharCadastro(): void {}

   habilitaBotao(): void {
      const buttonEdit = this.getValueInputElement('cadastrar');

      buttonEdit.disabled = false;
   }

   desabilitaBotao(): void {
      const buttonEdit = this.getValueInputElement('cadastrar');

      buttonEdit.disabled = true;
   }

   aoDispararCadastrar(callback: any): void {
      const addAlunoButton = this.getValueInputElement('cadastrar');
      const functionToAct = (elem: MouseEvent): void => {
         elem.preventDefault();
         callback();
      };

      addAlunoButton.addEventListener('click', functionToAct);
   }

   aoDispararEditar(callback: any): void {
      const functionToAct = (elem: MouseEvent): void => {
         elem.preventDefault();
         callback();
      };

      const saveAlunoButton = this.getValueInputElement('cadastrar');

      saveAlunoButton.addEventListener('click', functionToAct);
   }

   getValueInputElement(key: string): HTMLInputElement {
      return document.getElementById(`${key}`) as HTMLInputElement;
   }

   pegarDadosDoFormCadastro(): Aluno {
      const  campoMatricula = document.getElementById('matricula') as HTMLInputElement;
      const  campoNome = document.getElementById('nome') as HTMLInputElement;
      const  campoCPF= document.getElementById('cpf') as HTMLInputElement;
      const  campoTelefone = document.getElementById('telefone') as HTMLInputElement;
      const  campoEmail = document.getElementById('email') as HTMLInputElement;
     
      return new Aluno({
         id: 0,
         matricula: Number(campoMatricula.value),
         nome: String(campoNome.value),
         cpf:  String(campoCPF.value),
         telefone: String(campoTelefone.value),
         email: String(campoEmail.value)
      })
   };


   pegarDadosDoFormEditar(): Aluno {
      return new Aluno({
         id: 0,
         matricula: Number(this.getValueInputElement('matricula').value),
         nome: String(this.getValueInputElement('nome').value),
         cpf: String(this.getValueInputElement('cpf').value),
         telefone: String(this.getValueInputElement('telefone').value),
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

