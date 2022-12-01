import { AlunoCurso } from "./aluno-curso.js";
import { ServicoAlunoCurso } from "./aluno-curso-servico.js";
import { path } from "../utils/caminho-pagina.js";
import { Aluno } from "../aluno/aluno.js";
import { colunaTabela, linhaTabela } from "../components/Tabela/index.js";
export class VisaoListagem {
   servicoAlunoCurso: ServicoAlunoCurso;
   constructor() {
      this.servicoAlunoCurso = new ServicoAlunoCurso();
   }
   listarAlunoCursosRegex = (): boolean => (/^\/#\/aluno-curso\/?$/i).test(path());
   cadastroAlunoCursoRegex = (): boolean => (/^\/aluno-curso\/novo\/?$/i).test(path());
   atualizarAlunoCursoRegex = (): boolean => (/^\/aluno-curso\/\d+\/editar\/?$/).test(path());

   desenhar(alunosCursos: AlunoCurso[]): void {

      const tbodyTable = document.querySelector('#aluno-curso > tbody');

      if (!alunosCursos) {
         this.showSuccessMessage('Nenhum dado cadastrado!');

         return;
      }

      alunosCursos.forEach((alunoCurso :AlunoCurso) => {
         console.log(alunoCurso);
         const objAlunoCurso  = new AlunoCurso({id : alunoCurso.id, matricula : alunoCurso.matricula, av1: alunoCurso.av1, av2 : alunoCurso.av2, notaAF: alunoCurso.notaAF, falta : alunoCurso.falta, aluno : alunoCurso.aluno});
         console.log(objAlunoCurso.calcularMedia());
         tbodyTable?.append(linhaTabela([
            colunaTabela(objAlunoCurso!.matricula),
            colunaTabela('Rafael Barros'),
            colunaTabela(objAlunoCurso!.av1),
            colunaTabela(objAlunoCurso!.av2),
            colunaTabela(objAlunoCurso.calcularMedia()),
            colunaTabela(objAlunoCurso!.notaAF),
            colunaTabela(objAlunoCurso.calcularMediaFinal())]
         ));
      });
   }

   desenharEdit(alunoCurso: AlunoCurso): void {
      const matricula = this.getValueInputElement('matricula');
      const av1 = this.getValueInputElement('nota_av1');
      const av2 = this.getValueInputElement('nota_av2');
      const notaAF = this.getValueInputElement('nota_AF');
      const alunoID = this.getValueInputElement('aluno_id');

      matricula.value = alunoCurso.matricula.toFixed(2);
      av1.value = alunoCurso.av1.toFixed(2);
      av2.value = alunoCurso.av2.toFixed(2);
      notaAF.value = alunoCurso.notaAF.toFixed(2);
      alunoID.value = String(alunoCurso!.aluno!.id);
   }

   habilitaBotao(): void {
      const buttonEdit = this.getValueInputElement('salvar-aluno-curso');

      buttonEdit.disabled = false;
   }

   desabilitaBotao(): void {
      const buttonEdit = this.getValueInputElement('salvar-aluno-curso');

      buttonEdit.disabled = true;
   }

   aoDispararCadastrar(callback: any): void {
      const addAvisoButton = this.getValueInputElement('salvar-aluno-curso');
      const functionToAct = (elem: MouseEvent): void => {
         elem.preventDefault();
         callback();
      };

      addAvisoButton.addEventListener('click',
         functionToAct);
   }

   aoDispararEditar(callback: any): void {
      const functionToAct = (elem: MouseEvent): void => {
         elem.preventDefault();
         callback();
      };

      const saveAvisoButton = this.getValueInputElement('salvar-usuario');

      saveAvisoButton.addEventListener('click', functionToAct);
   }

   getValueInputElement(key: string): HTMLInputElement {
      return document.getElementById(`${key}`) as HTMLInputElement;
   }

   pegarDadosDoFormCadastro(): AlunoCurso {
      return new AlunoCurso({
         id: 0,
         matricula: Number(this.getValueInputElement('matricula')),
         av1: Number(this.getValueInputElement('nota_av1')),
         av2: Number(this.getValueInputElement('nota_av2')),
         notaAF: Number(this.getValueInputElement('nota_AF')),
         falta: Number(this.getValueInputElement('falta')),
         aluno: new Aluno({ id: Number(this.getValueInputElement('aluno_id')), matricula: 0, nome: '', cpf: '', telefone: '', email: '' })
      })
   };

   pegarDadosDoFormEditar(): AlunoCurso {
      return new AlunoCurso({
         id: 0,
         matricula: Number(this.getValueInputElement('matricula').value),
         av1: Number(this.getValueInputElement('nota_av1').value),
         av2: Number(this.getValueInputElement('nota_av2').value),
         notaAF: Number(this.getValueInputElement('nota_AF').value),
         falta: Number(this.getValueInputElement('falta').value),
         aluno: new Aluno({ id: Number(this.getValueInputElement('aluno_id').value), matricula: 0, nome: '', cpf: '', telefone: '', email: '' })
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

