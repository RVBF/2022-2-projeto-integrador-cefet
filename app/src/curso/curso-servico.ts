import { Curso } from './curso';
import { RepositorioError } from '../repositorio-error';
import { CursoRepositorio } from './curso-repositorio';

export class CursoServico {
    CursoRepositorio: CursoRepositorio;
    constructor() {
        this.CursoRepositorio = new CursoRepositorio();
    }

    pegarUrlId(): number {
        const [, , id] = location.pathname.split('/');

        if (!id) {
            throw new RepositorioError('Id não foi localizado!');
        }

        return Number(id);
    }

    adicionar(Curso: Curso): Promise<Response> {
        return this.CursoRepositorio.adicionar(Curso);
    }

    todos(limit: number, offset: number): Promise<Curso[]> {
        return this.CursoRepositorio.todos(limit, offset);
    }

    atualizar(Curso: Curso): Promise<Response> {
        return this.CursoRepositorio.atualizar(Curso);
    }

    async porAluno(cursoId: number): Promise<Curso[]> {
        return this.CursoRepositorio.buscarPorCurso(cursoId);
    }

    async delete(cursoId: number): Promise<Response> {
        return this.CursoRepositorio.delete(cursoId);
    }

}
