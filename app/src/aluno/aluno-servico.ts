import { Aluno } from './aluno';
import { AlunoRepositorio } from './aluno-repositorio';
import { AlunoError } from './aluno-error';

export class AlunoServico {

   alunoRepositorio: AlunoRepositorio;
   constructor() {
      this.alunoRepositorio = new AlunoRepositorio();
   }

   adicionar(aluno: Aluno): Promise<any> {
      const todosErrosNoAluno = aluno.validateAll();
      if ( todosErrosNoAluno.length > 0 ) {
          throw new AlunoError( todosErrosNoAluno.join('<br>') );
      }

      return this.alunoRepositorio.adicionar(aluno);
   }

   todos(limit: number | null = null, offset: number | null = null): Promise<Aluno[]> {
      return this.alunoRepositorio.todos(limit, offset);
   }

   getProximaMatriculaDisponivel() : Promise<String>{
      return this.alunoRepositorio.getProximaMatriculaDisponivel();
   }

   atualizar(Aluno: Aluno): Promise<Response> {
      return this.alunoRepositorio.atualizar(Aluno);
   }

   porAluno(alunoId: number): Promise<any> {
      return this.alunoRepositorio.buscarPorAluno(alunoId);
   }
   porCurso(cursoId: number): Promise<Aluno[]> {

      return this.alunoRepositorio.buscarPorCurso(cursoId);
   }

   delete(alunoId: number): Promise<Response> {
      return this.alunoRepositorio.delete(alunoId);
   }

   pegaUrlId(): number {
      const [, , id] = location.pathname.split('/');

      if (!id) {
         throw new AlunoError('Não foi possível pegar o id do aluno!');
      }

      return parseInt(id);
   }

}
