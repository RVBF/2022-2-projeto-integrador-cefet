import { AlunoCurso } from './aluno-curso.js';
import { RepositorioError } from '../repositorio-error.js';
import { AlunoCursoRepositorio } from './aluno-curso-repositorio.js';

export class ServicoAlunoCurso {
   AlunoCursoRepositorio: AlunoCursoRepositorio;
   constructor() {
      this.AlunoCursoRepositorio = new AlunoCursoRepositorio();
   }

   pegarUrlId(): number {
      const [, , id] = location.pathname.split('/');

      if (!id) {
         throw new RepositorioError('Id não foi localizado!');
      }

      return Number(id);
   }

   adicionar(AlunoCurso: AlunoCurso): Promise<Response> {
      return this.AlunoCursoRepositorio.adicionar(AlunoCurso);
   }

   todos(limit: number, offset : number): Promise<AlunoCurso[]> {
      return this.AlunoCursoRepositorio.todos(limit, offset);
   }

   atualizar(AlunoCurso: AlunoCurso): Promise<Response> {
      return this.AlunoCursoRepositorio.atualizar(AlunoCurso);
   }

   async porAluno(alunoId: number): Promise<AlunoCurso[]> {
      return this.AlunoCursoRepositorio.buscarPorAluno(alunoId);
   }

   async delete(alunoId: number): Promise<Response> {
      return this.AlunoCursoRepositorio.delete(alunoId);
   }
   
}
