import { AlunoCurso } from "./aluno-curso";
import { ServicoAlunoCurso } from "./aluno-curso-servico";
import { path } from "../utils/caminho-pagina";
import { Aluno } from "../aluno/aluno";
import { colunaTabela, linhaTabela } from "../components/Tabela/index";
import { AlunoServico } from "../aluno/aluno-servico";
import { Curso } from "../curso/curso";
export class VisaoAlunoCurso {
   servicoAlunoCurso: ServicoAlunoCurso;
   servicoAluno: AlunoServico;
   _this: VisaoAlunoCurso = this;
   constructor() {
      this.servicoAlunoCurso = new ServicoAlunoCurso();
      this.servicoAluno = new AlunoServico();
   }

   listarNotasRegex = (): boolean => (/^\/notas\/?$/i).test(path());
   cadastrosRegex = (): boolean => (/^\/notas\/novo\/?$/i).test(path());
   atualizarAlunoRegex = (): boolean => (/^\/notas\/\d+\/editar\/?$/).test(path());

   desenhar(alunosCursos: AlunoCurso[]): void {

      const tbodyTable = document.querySelector('#aluno-curso > tbody');

      if (!alunosCursos) {
         this.showSuccessMessage('Nenhum dado cadastrado!');

         return;
      }

      alunosCursos.forEach((alunoCurso: AlunoCurso) => {
         const objAlunoCurso = new AlunoCurso({ id: alunoCurso.id, matricula: alunoCurso.matricula, av1: alunoCurso.av1, av2: alunoCurso.av2, notaAF: alunoCurso.notaAF, falta: alunoCurso.falta, aluno: alunoCurso.aluno });
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

   desenharCadastro(): void {
      var select = document.querySelectorAll('select');
      var selectInstance = M.FormSelect.init(select);
      this.preencheSelects(selectInstance);
      this.atualizaSituacao(this);

      document.getElementById('aluno')?.addEventListener('change', function (event) {
         const select = (document.querySelector('#aluno') as HTMLSelectElement);
         const matricula = (document.querySelector('#matricula') as HTMLInputElement);
         matricula.value = String(select.options[select.selectedIndex].getAttribute('matricula'));
      });
   }

   processaSituacao(): void {
      const nota_av1 = (document.getElementById('av1') as HTMLInputElement);
      const nota_av2 = (document.getElementById('av2') as HTMLInputElement);
      const faltas = (document.getElementById('falta') as HTMLInputElement);
      const situacao = (document.getElementById('situacao') as HTMLInputElement);
      const alunoCurso = new AlunoCurso({
         id: 0,
         matricula: 0,
         av1: parseFloat(nota_av1.value),
         av2: parseFloat(nota_av2.value),
         notaAF: 0.00,
         falta: 0,
         aluno: null
      });

      situacao!.value = String(alunoCurso.situacaoAluno());
   };

   atualizaSituacao = async function (objeto: VisaoAlunoCurso) {
      document.querySelector('#av1')?.addEventListener('keyup', objeto.processaSituacao);
      document.querySelector('#av2')?.addEventListener('keyup', objeto.processaSituacao);
      document.querySelector('#falta')?.addEventListener('keyup', objeto.processaSituacao);
   }

   preencheSelects = async (selectInstance: M.FormSelect[]): Promise<void> => {
      const allAlunos = await this.servicoAluno.todos();
      // const allCursos = await this.servicoC.todos();
      this.preencheSelectAlunos(allAlunos);
      // this.preencheSelectAlunos( allCursos );
      var select = document.querySelectorAll('select');
      var selectInstance = M.FormSelect.init(select);
   };

   preencheSelectAlunos(allAlunos: Aluno[]): void {
      const selectaluno = document.querySelector('#aluno');

      while (selectaluno?.firstChild) {
         selectaluno.firstChild.remove();
      }

      allAlunos.forEach((aluno) => {
         const novaOpcao = document.createElement('option');
         novaOpcao.setAttribute('matricula', String(aluno.matricula))
         novaOpcao.innerHTML = aluno.nome;
         novaOpcao.value = String(aluno.id);
         selectaluno?.append(novaOpcao);
      });
   }

   preencheSelectCursos(allCuros: Curso[]): void {
      console.log(allCuros);
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
      const addAlunoCursos = this.getValueInputElement('cadastrar');
      const functionToAct = (elem: MouseEvent): void => {
         elem.preventDefault();
         callback();
      };

      addAlunoCursos.addEventListener('click', functionToAct);
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

