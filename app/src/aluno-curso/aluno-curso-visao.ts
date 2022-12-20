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
            colunaTabela(alunoCurso.aluno!.nome),
            colunaTabela(alunoCurso!.av1 || 'Nota não lançada'),
            colunaTabela(alunoCurso!.av2 || 'Nota não lançada'),
            colunaTabela( ( alunoCurso.av1 && alunoCurso.av2 ) ? alunoCurso.calcularMedia() : 'Média não definida'),
            colunaTabela(alunoCurso!.notaAF || 'Nota não lançada'),
            colunaTabela(( alunoCurso.av1 && alunoCurso.av2 && alunoCurso.notaAF ) ? alunoCurso.calcularMediaFinal() : 'Média final não definida'),
            colunaTabela( alunoCurso.situacaoAluno() ),
            colunaTabela(Link('atualizar', `/notas/${alunoCurso!.id}/editar`, '<span class="material-icons">edit </span>', 'btn') as HTMLElement),
            colunaTabela(Button('remover', '<span class="material-icons">delete_outline</span>', 'btn', [{ 'name': 'IdAluno', 'valor': String(alunoCurso.id) }]) as HTMLElement),
         ];
         tbodyTable?.append(linhaTabela(conteudoLinha));
      });
   }

   validaSituacao( alunoCurso: AlunoCurso, situacaoInput: HTMLInputElement ): void{
      const nota_av1 = (document.getElementById('av1') as HTMLInputElement);
      const nota_av2 = (document.getElementById('av2') as HTMLInputElement);
      const faltas = (document.getElementById('faltas') as HTMLInputElement);

      alunoCurso.av1 = Number(nota_av1.value)
      alunoCurso.av2 = Number(nota_av2.value)
      alunoCurso.faltas = Number(faltas.value)            

      if( alunoCurso.situacaoAluno() === 'Avaliação Final' || alunoCurso.notaAF ){
         this.getValueInputElement('avaliacaoFinal').hidden = false
      }else{
         this.getValueInputElement('avaliacaoFinal').hidden = true
      }

      situacaoInput!.value = String(alunoCurso.situacaoAluno());
   }

   desenharEdit(alunoCurso: AlunoCurso): void {

      const notasInput = document.querySelectorAll('#av1, #av2, #faltas')
      const situacaoInput = this.getValueInputElement('situacao');

      notasInput.forEach( (campo) => {
         campo.addEventListener('keyup', () => this.validaSituacao(alunoCurso, situacaoInput));
      } )

      if( alunoCurso.situacaoAluno() === 'Avaliação Final' || alunoCurso.notaAF ) {
         this.getValueInputElement('avaliacaoFinal').hidden = false
      }

      situacaoInput!.value = String(alunoCurso.situacaoAluno())

      const idInput = this.getValueInputElement('id-nota');

      const matricula = this.getValueInputElement('matricula');

      const av1 = this.getValueInputElement('av1');
      const av2 = this.getValueInputElement('av2');
      const notaAF = this.getValueInputElement('af');

      const alunoID = this.getValueInputElement('aluno_id');

      const alunoNome = this.getValueInputElement('aluno_nome');
      const titulo = document.querySelector('h2');

      const nomeCurso = this.getValueInputElement('nome_curso');
      const cursoId = this.getValueInputElement('curso_id');

      const faltaInput = this.getValueInputElement('faltas');      
      faltaInput.value = String(alunoCurso!.faltas)

      cursoId.value = String(alunoCurso.curso!.id)
      
      nomeCurso.innerText = alunoCurso.curso!.nome
      alunoNome.innerText = alunoCurso.aluno!.nome

      titulo!.innerText = 'Editar Notas';

      idInput!.value = String(alunoCurso.id);      

      matricula.value = String(alunoCurso.matricula);
      matricula.focus();

      av1.value = String(alunoCurso.av1 || '');
      av1.focus();

      av2.value = String(alunoCurso.av2 || '');
      av2.focus();

      notaAF.value = String(alunoCurso.notaAF || '');
      notaAF.focus();

      alunoID.value = String(alunoCurso.aluno!.id);
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

      const saveAlunoCurso = this.getValueInputElement('cadastrar');
      
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
      const  campoAvaliacaoFinal = document.getElementById('af') as HTMLInputElement;
      const  campoFalta = document.getElementById('faltas') as HTMLInputElement;
      const  campoAluno = document.getElementById('aluno') as HTMLInputElement;
      return new AlunoCurso({
         id: 0,
         matricula: Number(campoMatricula.value),
         av1: Number(campoAV1.value),
         av2:  Number(campoAV2.value),
         notaAF: Number(campoAvaliacaoFinal.value),
         faltas: Number(campoFalta.value),
         aluno: new Aluno({ id: Number(campoAluno.value), matricula: campoMatricula.value.toString(), nome: '', cpf: '', telefone: '', email: '', cursos : null}),
         curso: null
      })
   };

   pegarDadosDoFormEditar(): AlunoCurso {
      return new AlunoCurso({
         id: Number(this.getValueInputElement('id-nota').value),
         matricula: Number(this.getValueInputElement('matricula').value),
         av1: Number(this.getValueInputElement('av1').value),
         av2: Number(this.getValueInputElement('av2').value),
         notaAF: Number(this.getValueInputElement('af').value),
         faltas: Number(this.getValueInputElement('faltas').value),
         aluno: new Aluno({ id: Number(this.getValueInputElement('aluno_id').value), matricula: '', nome: '', cpf: '', telefone: '', email: '', cursos : null}),
         curso: new Curso({ id: Number(this.getValueInputElement('curso_id').value), codigo: '', nome: '', dataFim: null, dataInicio: null, numeroAulas: 0, professor: null, situacao: ''})
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

