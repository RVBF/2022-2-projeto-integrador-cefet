import { Aluno } from './aluno';
import { RepositorioError } from '../repositorio-error';
import { AlunoRepositorio } from './aluno-repositorio';
import { AlunoError } from './aluno-error';

export class AlunoServico {

   alunoRepositorio: AlunoRepositorio;
   constructor() {
      this.alunoRepositorio = new AlunoRepositorio();
   }

   pegarUrlId(): number {
      const [, , id] = location.pathname.split('/');

      if (!id) {
         throw new RepositorioError('Id não foi localizado!');
      }

      return Number(id);
   }

   adicionar( aluno: Aluno ): Promise<any> {
      const todosErrosNoAluno = aluno.validateAll();
      // if ( todosErrosNoAluno.length > 0 ) {
      //     throw new AlunoError( todosErrosNoAluno.join( '<br>' ) );
      // }

      return this.alunoRepositorio.adicionar( aluno );
  }

   todos(limit: number | null = null, offset: number | null = null): Promise<Aluno[]> {
      return this.alunoRepositorio.todos(limit, offset);
   }

   atualizar(Aluno: Aluno): Promise<Response> {
      return this.alunoRepositorio.atualizar(Aluno);
   }

   porAluno(alunoId: number): Promise<any> {
      return this.alunoRepositorio.buscarPorAluno(alunoId);
   }

   delete(alunoId: number): Promise<Response> {
      return this.alunoRepositorio.delete(alunoId);
   }

   catchUrlId(): number {
      const [ , , id ] = location.pathname.split( '/' );

      if ( !id ) {
          throw new AlunoError( 'Não foi possível pegar o id do aluno!' );
      }

      return parseInt( id );
  }

}
