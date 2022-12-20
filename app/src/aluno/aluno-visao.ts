import { Aluno } from "./aluno";
import { AlunoServico } from "./aluno-servico";
import { path } from "../utils/caminho-pagina";
import { colunaTabela, linhaTabela } from "../components/Tabela";
import { Link } from "../components/Ancora";
import { Button } from "../components";
import { Curso } from "../curso/curso";
import { Funcionario } from "../funcionario/funcionario";
import { AlunoCurso } from "../aluno-curso/aluno-curso";

export class AlunoVisao {
   servicoAluno: AlunoServico;

   constructor() {
      this.servicoAluno = new AlunoServico();
   }

   listarAlunoRegex = (): boolean => (/^\/alunos\/?$/i).test(path());
   cadastrosRegex = (): boolean => (/^\/alunos\/novo\/?$/i).test(path());
   atualizarAlunoRegex = (): boolean => (/^\/alunos\/\d+\/editar\/?$/).test(path());
   visualizarAlunoRegex = (): boolean => (/^\/alunos\/\d+\/visualizar\/?$/).test(path());

   desenhar(alunos: Aluno[]): void {
      const tbodyTable = document.querySelector('#alunos > tbody');
      if (alunos.length == 0) {
         this.showSuccessMessage('Nenhum dado cadastrado!');
         return;
      }

      alunos.forEach((aluno) => {
         const conteudoLinha: Array<HTMLTableCellElement> = [
            colunaTabela(aluno.matricula),
            colunaTabela(aluno!.nome),
            colunaTabela(aluno.cpf),
            colunaTabela(aluno.email),
            colunaTabela(aluno.telefone),
            colunaTabela(Link(`atualizar_${aluno.id}`, `/alunos/${aluno.id}/editar`, '<span class="material-icons">edit </span>', 'btn atualizar ') as HTMLElement),
            colunaTabela(Link(`visualizar_${aluno.id}`, `/alunos/${aluno.id}/visualizar`, '<span class="material-icons">visibility</span>', 'btn visualizar ') as HTMLElement),
            colunaTabela(Button(`remover_${aluno.id}`, '<span class="material-icons">delete_outline</span>', 'btn remover ', [{ 'name': 'IdAluno', 'valor': String(aluno.id) }]) as HTMLElement),
         ];
         tbodyTable?.append(linhaTabela(conteudoLinha));
      });
   }

   preencherMatricula(novoNumeroMatricula: String): void {
      const matricula = this.getValueInputElement('matricula');
      matricula.focus();

      matricula.value = String(novoNumeroMatricula);
      matricula.disabled = true;
   }

   popularSelectCursos(cursos: import("../curso/curso").Curso[]) {
      const selectCursos = document.getElementById('cursos');

      cursos.forEach((curso) => {
         let novoOption = document.createElement('option');

         novoOption.value = curso.codigo.toString();
         novoOption.innerHTML = curso.nome;
         selectCursos?.append(novoOption);
      });

      var select = document.querySelectorAll('select');
      var selectInstance = M.FormSelect.init(select);
   }


   desenharEdit(aluno: Aluno): void {
      const id = this.getValueInputElement('id');
      const matricula = this.getValueInputElement('matricula');
      const nome = this.getValueInputElement('nome');
      const cpf = this.getValueInputElement('cpf');
      const telefone = this.getValueInputElement('telefone');
      const email = this.getValueInputElement('email');
      const titulo = document.querySelector('h2');
      const cursos = document.getElementById('cursos') as HTMLSelectElement;
      titulo!.innerText = 'Editar Aluno';
      if(aluno.cursos != null){
         for (const key in cursos.options) {
            if (Object.prototype.hasOwnProperty.call(cursos.options, key)) {
               const element = cursos.options[key] as HTMLOptionElement;
               (aluno.cursos).forEach((curso ) =>{
                  if(((curso.curso as Curso).codigo == element.value)) element.selected = true;
               })
            }
      }
      }

      id.value = String(aluno.id);
      id.focus();
      matricula.value = String(aluno.matricula);
      matricula.focus();
      matricula.disabled = matricula.readOnly = true;
      nome.value = String(aluno.nome);
      nome.focus();
      cpf.value = String(aluno.cpf);
      cpf.focus();
      telefone.value = String(aluno.telefone);
      telefone.focus();
      email.value = aluno.email;
      email.focus();

      var select = document.querySelectorAll('select');
      var selectInstance = M.FormSelect.init(select);
   }

   desenharCadastro(): void { }

   habilitaBotao(): void {
      const buttonEdit = this.getValueInputElement('salvar');

      buttonEdit.disabled = false;
   }

   desabilitaBotao(): void {
      const buttonEdit = this.getValueInputElement('salvar');

      buttonEdit.disabled = true;
   }

   aoDispararCadastrar(callback: any): void {
      const addAlunoButton = this.getValueInputElement('salvar');
      const functionToAct = (elem: MouseEvent): void => {
         elem.preventDefault();
         callback();
      };

      addAlunoButton.addEventListener('click', functionToAct);
   }

   aoDispararEditar(callback: any): void {
      this.aoDispararCadastrar(callback);
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
         const botao = (elem.target as HTMLButtonElement).parentNode as HTMLButtonElement;

         callback(botao.getAttribute('idaluno'));
      };

      const botoesRemoverAluno = document.querySelectorAll('.remover');
      botoesRemoverAluno.forEach((botao, i) => {
         const elemento = botoesRemoverAluno[i] as HTMLButtonElement;
         elemento.addEventListener('click', functionToAct)
      })
   }

   getValueInputElement(key: string): HTMLInputElement {
      return document.getElementById(`${key}`) as HTMLInputElement;
   }

   pegarDadosDoFormCadastro(): Aluno {
      const campoId = document.getElementById('id') as HTMLInputElement;
      const campoMatricula = document.getElementById('matricula') as HTMLInputElement;
      const campoNome = document.getElementById('nome') as HTMLInputElement;
      const campoCPF = document.getElementById('cpf') as HTMLInputElement;
      const campoTelefone = document.getElementById('telefone') as HTMLInputElement;
      const campoEmail = document.getElementById('email') as HTMLInputElement;
      const campoCursos = document.getElementById('cursos') as HTMLSelectElement;
      const opcoesSeleciondas = campoCursos.selectedOptions;
      let cursos: Array<Curso> = [];

      for (const key in opcoesSeleciondas) {
         if (Object.prototype.hasOwnProperty.call(opcoesSeleciondas, key)) {
            const element = opcoesSeleciondas[key] as HTMLOptionElement;

            let curso = new Curso({ id: 0, codigo: element.value, nome: element.innerHTML, situacao: '', numeroAulas: 0, dataInicio: null, dataFim: null, professor: null })
            cursos.push(curso);
         }
      }
      return new Aluno({
         id: Number(campoId.value),
         matricula: campoMatricula.value,
         nome: String(campoNome.value),
         cpf: String(campoCPF.value),
         telefone: String(campoTelefone.value),
         email: String(campoEmail.value),
         cursos: cursos
      });
   };

   configuraVisualizacao(): void {
      const campoId = document.getElementById('id') as HTMLInputElement;
      const campoMatricula = document.getElementById('matricula') as HTMLInputElement;
      const campoNome = document.getElementById('nome') as HTMLInputElement;
      const campoCPF = document.getElementById('cpf') as HTMLInputElement;
      const campoTelefone = document.getElementById('telefone') as HTMLInputElement;
      const campoEmail = document.getElementById('email') as HTMLInputElement;
      const salvaAlunoBotao = this.getValueInputElement('salvar');
      const cancelarAlunoBotao = this.getValueInputElement('cancelar');
      const titulo = document.querySelector('h2');

      titulo!.innerText = 'Visualizar Aluno';
      campoId.disabled = true;
      campoMatricula.disabled = true;
      campoNome.disabled = true;
      campoCPF.disabled = true;
      campoTelefone.disabled = true;
      campoEmail.disabled = true;
      salvaAlunoBotao.remove();
      cancelarAlunoBotao.remove();
   };

   pegarDadosDoFormEditar(): Aluno {
      return this.pegarDadosDoFormCadastro();
   }

   showSuccessMessage(message: string): void {
      const successMessage = document.getElementById('sucessBar');

      successMessage!.innerHTML = message;
      successMessage!.className = 'show';
      setTimeout(() => {
         successMessage!.className = successMessage!.className.replace('show', '');
      }, 2000);
   }

   showErrorMessage(message: any): void {
      const errorMessage = document.getElementById('errorBar');
      errorMessage!.innerHTML = String(message);
      errorMessage!.className = 'show';
      setTimeout(() => {
         errorMessage!.className = errorMessage!.className.replace('show', '');
      }, 2000);
   }
}

