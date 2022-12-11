import { Funcionario } from './funcionario';
import { RepositorioError } from '../repositorio-error';
import { FuncionarioRepositorio } from './funcionario-repositorio';

export class FuncionarioServico {
    FuncionarioRepositorio: FuncionarioRepositorio;
    constructor() {
        this.FuncionarioRepositorio = new FuncionarioRepositorio();
    }

    pegarUrlId(): number {
        const [, , id] = location.pathname.split('/');

        if (!id) {
            throw new RepositorioError('Id não foi localizado!');
        }

        return Number(id);
    }

    adicionar(Funcionario: Funcionario): Promise<Response> {
        return this.FuncionarioRepositorio.adicionar(Funcionario);
    }

    todos(limit: number, offset: number): Promise<Funcionario[]> {
        return this.FuncionarioRepositorio.todos(limit, offset);
    }

    atualizar(Funcionario: Funcionario): Promise<Response> {
        return this.FuncionarioRepositorio.atualizar(Funcionario);
    }

    async porAluno(funcionarioId: number): Promise<Funcionario[]> {
        return this.FuncionarioRepositorio.buscarPorFuncionario(funcionarioId);
    }

    async delete(funcionarioId: number): Promise<Response> {
        return this.FuncionarioRepositorio.delete(funcionarioId);
    }

}
