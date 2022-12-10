import { Aluno } from './aluno';
import { RepositorioError } from '../repositorio-error';
import { AlunoRepositorio } from './aluno-repositorio';

export class AlunoServico {
   AlunoRepositorio: AlunoRepositorio;
   constructor() {
      this.AlunoRepositorio = new AlunoRepositorio();
   }

   pegarUrlId(): number {
      const [, , id] = location.pathname.split('/');

      if (!id) {
         throw new RepositorioError('Id não foi localizado!');
      }

      return Number(id);
   }

   adicionar(Aluno: Aluno): Promise<Response> {
      return this.AlunoRepositorio.adicionar(Aluno);
   }

   todos(limit: number | null = null, offset: number | null = null): Promise<Aluno[]> {
      return this.AlunoRepositorio.todos(limit, offset);
   }

   atualizar(Aluno: Aluno): Promise<Response> {
      return this.AlunoRepositorio.atualizar(Aluno);
   }

   async porAluno(alunoId: number): Promise<Aluno[]> {
      return this.AlunoRepositorio.buscarPorAluno(alunoId);
   }

   async delete(alunoId: number): Promise<Response> {
      return this.AlunoRepositorio.delete(alunoId);
   }

}
