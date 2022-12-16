import { Curso } from './curso';
import { CursoRepositorio } from './curso-repositorio';
import { CursoError } from './curso-error';

export class CursoServico {
    CursoRepositorio: CursoRepositorio;
    constructor() {
        this.CursoRepositorio = new CursoRepositorio();
    }
    pegaUrlId(): number {
        const [ , , id ] = location.pathname.split( '/' );
  
        if ( !id ) {
            throw new CursoError( 'Não foi possível pegar o id do curso!' );
        }
  
        return parseInt( id );
    }
  

    adicionar(curso: Curso): Promise<Response> {
        const todosErrosNoAluno = curso.validar();
        if ( todosErrosNoAluno.length > 0 ) {
            throw new CursoError( todosErrosNoAluno.join('<br>') );
        }

        return this.CursoRepositorio.adicionar(curso);
    }

    todos(limit: number |null, offset: number|null): Promise<Curso[]> {
        return this.CursoRepositorio.todos(limit, offset);
    }

    atualizar(Curso: Curso): Promise<Response> {
        return this.CursoRepositorio.atualizar(Curso);
    }

    async porCurso(cursoId: number): Promise<Curso> {
        return this.CursoRepositorio.buscarPorCurso(cursoId);
    }

    async delete(cursoId: number): Promise<Response> {
        return this.CursoRepositorio.delete(cursoId);
    }

}
