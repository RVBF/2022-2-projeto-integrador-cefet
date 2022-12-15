import { AlunoCurso } from "./aluno-curso";
import { ServicoAlunoCurso } from "./aluno-curso-servico";
import { path } from "../utils/caminho-pagina";
import { Aluno } from "../aluno/aluno";
import { colunaTabela, linhaTabela } from "../components/Tabela/index";
import { AlunoServico } from "../aluno/aluno-servico";
import { Curso } from "../curso/curso";
import { Link } from "../components/Ancora";
import { Button } from "../components";


export class VisaoAlunoCurso {
   servicoAlunoCurso: ServicoAlunoCurso;
   servicoAluno: AlunoServico;
   _this: VisaoAlunoCurso = this;

   constructor() {
      this.servicoAlunoCurso = new ServicoAlunoCurso();
      this.servicoAluno = new AlunoServico();
   }

   listarNotasRegex = (): boolean => (/^\/notas\/?$/i).test(path());
   cadastroNotasRegex = (): boolean => (/^\/notas\/novo\/?$/i).test(path());
   atualizarNotasRegex = (): boolean => (/^\/notas\/\d+\/editar\/?$/).test(path());

   desenhar(alunosCursos: AlunoCurso[]): void {

      const tbodyTable = document.querySelector('#aluno-curso > tbody');

      if (!alunosCursos) {
         this.showSuccessMessage('Nenhum dado cadastrado!');

         return;
      }

      alunosCursos.forEach((alunoCurso) => {
         const conteudoLinha: Array<HTMLTableCellElement> = [
            colunaTabela(alunoCurso!.matricula),
            colunaTabela('Rafael Barros'),
            colunaTabela(alunoCurso!.av1),
            colunaTabela(alunoCurso!.av2),
            colunaTabela(alunoCurso.calcularMedia()),
            colunaTabela(alunoCurso!.notaAF),
            colunaTabela(alunoCurso.calcularMediaFinal()),
            colunaTabela(Link('atualizar', `/aluno-curso/${alunoCurso.id}/editar`, '<span class="material-icons">edit </span>', 'btn') as HTMLElement),
            colunaTabela(Button('remover', '<span class="material-icons">delete_outline</span>', 'btn', [{ 'name': 'IdAluno', 'valor': String(alunoCurso.id) }]) as HTMLElement),
         ];
         tbodyTable?.append(linhaTabela(conteudoLinha));
      });
   }

   desenharEdit(alunoCurso: AlunoCurso): void {
      const id = this.getValueInputElement('id');
      const matricula = this.getValueInputElement('matricula');
      const av1 = this.getValueInputElement('nota_av1');
      const av2 = this.getValueInputElement('nota_av2');
      const notaAF = this.getValueInputElement('nota_AF');
      const alunoID = this.getValueInputElement('aluno_id');
      const titulo = document.querySelector('h2');

      titulo!.innerText = 'Editar Notas';

      id.value = String(alunoCurso.id);
      id.focus();

      matricula.value = String(alunoCurso.id);
      matricula.focus();

      av1.value = String(alunoCurso.id);
      av1.focus();

      av2.value = String(alunoCurso.id);
      av2.focus();

      notaAF.value = String(alunoCurso.id);
      notaAF.focus();

      alunoID.value = String(alunoCurso!.aluno!.id);
   }

   desenharCadastro(): void {
      var select = document.querySelectorAll('select');
      var selectInstance = M.FormSelect.init(select);
      this.atualizaSituacao(this);

      document.getElementById('aluno')?.addEventListener('change', function (event) {
         const select = (document.querySelector('#aluno') as HTMLSelectElement);
         const matricula = (document.querySelector('#matricula') as HTMLInputElement);
         matricula.value = String(select.options[select.selectedIndex].getAttribute('matricula'));
      });
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

      const saveAlunoCurso = this.getValueInputElement('salvar');

      saveAlunoCurso.addEventListener('click', functionToAct);
   }

   aoDispararVoltar(callback: any): void {
      const functionToAct = (elem: MouseEvent): void => {
         elem.preventDefault();
         callback();
      };

      const voltaAlunoBotao = this.getValueInputElement('voltar');

      voltaAlunoBotao.addEventListener('click', functionToAct);
   }

   aoDispararRemover(callback: any): void {
      const functionToAct = (elem: MouseEvent): void => {
         elem.preventDefault();
         const botao = elem.target as HTMLButtonElement;

         console.log(botao.getAttribute('idNota'));
         callback(botao.getAttribute('nota-id'));
      };

      const voltaNotaBotao = this.getValueInputElement('remover');

      voltaNotaBotao.addEventListener('click', functionToAct);
   }

   getValueInputElement(key: string): HTMLInputElement {
      return document.getElementById(`${key}`) as HTMLInputElement;
   }

   pegarDadosDoFormCadastro(): AlunoCurso {
      const  campoMatricula = document.getElementById('matricula') as HTMLInputElement;
      const  campoAV1 = document.getElementById('av1') as HTMLInputElement;
      const  campoAV2 = document.getElementById('av2') as HTMLInputElement;
      const  campoAvaliacaoFinal = document.getElementById('avaliacaoFinal') as HTMLInputElement;
      const  campoFalta = document.getElementById('falta') as HTMLInputElement;
      const  campoAluno = document.getElementById('aluno') as HTMLInputElement;
      return new AlunoCurso({
         id: 0,
         matricula: Number(campoMatricula.value),
         av1: Number(campoAV1.value),
         av2:  Number(campoAV2.value),
         notaAF: Number(campoAvaliacaoFinal.value),
         falta: Number(campoFalta.value),
         aluno: new Aluno({ id: Number(campoAluno.value), matricula: Number(campoMatricula.value), nome: '', cpf: '', telefone: '', email: '' })
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

