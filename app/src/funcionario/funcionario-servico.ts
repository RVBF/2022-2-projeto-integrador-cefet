import { Funcionario } from './funcionario';
import { FuncionarioRepositorio } from './funcionario-repositorio';
import { FuncionarioError } from './funcionario-error';

export class FuncionarioServico {
    FuncionarioRepositorio: FuncionarioRepositorio;
   
    constructor() {
        this.FuncionarioRepositorio = new FuncionarioRepositorio();
    }

    adicionar(aluno: Funcionario): Promise<any> {
        const todosErrosNoAluno = aluno.validateAll();
        if ( todosErrosNoAluno.length > 0 ) {
            throw new FuncionarioError( todosErrosNoAluno.join('<br>') );
        }
  
        return this.FuncionarioRepositorio.adicionar(aluno);
     }

     todos(limit: number | null = null, offset: number | null = null): Promise<Funcionario[]> {
        return this.FuncionarioRepositorio.todos(limit, offset);
     }

     todosProfessores(): Promise<Funcionario[]> {
        return this.FuncionarioRepositorio.todosProfessores();
     }
  
     atualizar(funcionario: Funcionario): Promise<Response> {
        return this.FuncionarioRepositorio.atualizar(funcionario);
     }
  
     porFuncionario(funcionarioId: number): Promise<any> {
        return this.FuncionarioRepositorio.buscarPorFuncionario(funcionarioId);
     }
  
     delete(funcionarioId: number): Promise<Response> {
        return this.FuncionarioRepositorio.delete(funcionarioId);
     }
  
     pegaUrlId(): number {
        const [, , id] = location.pathname.split('/');
  
        if (!id) {
           throw new FuncionarioError('Não foi possível pegar o id do aluno!');
        }
  
        return parseInt(id);
     }

}
