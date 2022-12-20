import { AlunoCurso } from './aluno-curso';
import { RepositorioError } from '../repositorio-error';
import { AlunoCursoRepositorio } from './aluno-curso-repositorio';
import { AlunoCursoError } from './aluno-curso-error';

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
      const todosErrosNoAluno = AlunoCurso.validateAll();

      return this.AlunoCursoRepositorio.adicionar(AlunoCurso);
   }

   async todos(limit: number | null = null, offset: number | null = null): Promise<AlunoCurso[]> {
      const allAlunosCurso = await this.AlunoCursoRepositorio.todos(limit, offset);
      return allAlunosCurso.map( ( aluno ) => new AlunoCurso(aluno) );
   }

   atualizar(Aluno: AlunoCurso): Promise<Response> {
      return this.AlunoCursoRepositorio.atualizar(Aluno);
   }

   porAluno(alunoId: number): Promise<any> {
      return this.AlunoCursoRepositorio.buscarPorAlunoCurso(alunoId);
   }

   comId( id: number ): Promise<AlunoCurso>{
      return this.AlunoCursoRepositorio.comId(id);
   }
   

   delete(alunoId: number): Promise<Response> {
      return this.AlunoCursoRepositorio.delete(alunoId);
   }

   catchUrlId(): number {
      const [ , , id ] = location.pathname.split( '/' );

      if ( !id ) {
          throw new AlunoCursoError( 'Não foi possível pegar o id da nota!' );
      }

      return parseInt( id );
  }
}
