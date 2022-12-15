import { Funcionario } from './funcionario';
import { RepositorioError } from '../repositorio-error';
import { FuncionarioRepositorio } from './funcionario-repositorio';
import { FuncionarioError } from './funcionario-error';

export class FuncionarioServico {
    FuncionarioRepositorio: FuncionarioRepositorio;
   
    constructor() {
        this.FuncionarioRepositorio = new FuncionarioRepositorio();
    }

    pegarUrlId(): number {
        const [, , id] = location.pathname.split('/');

        if (!id) {
            throw new FuncionarioError('Id não foi localizado!');
        }

        return Number(id);
    }

    adicionar(funcionario: Funcionario): Promise<Response> {
        return this.FuncionarioRepositorio.adicionar(funcionario);
    }

    todos(limit: number, offset: number): Promise<Funcionario[]> {
        return this.FuncionarioRepositorio.todos(limit, offset);
    }

    atualizar(funcionario: Funcionario): Promise<Response> {
        return this.FuncionarioRepositorio.atualizar(funcionario);
    }

    async pegaFuncionario(funcionarioId: number): Promise<Funcionario> {
        return this.FuncionarioRepositorio.buscarPorFuncionario(funcionarioId);
    }

    async delete(funcionarioId: number): Promise<Response> {
        return this.FuncionarioRepositorio.delete(funcionarioId);
    }

}
