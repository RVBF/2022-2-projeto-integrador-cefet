import { appConfig } from '../config/config';
import { Curso } from './curso';
import { RepositorioError } from '../repositorio-error';

const API_CURSO = `${appConfig.api}/curso`;

/* eslint-disable max-len */
export class CursoRepositorio {
    async atualizar(curso: Curso): Promise<Response> {
        const response = await fetch(`${API_CURSO}/${curso.id}/edit`, {
            method: 'PUT',
            body: JSON.stringify(curso),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new RepositorioError(
                `Erro ao atualizar ID : ${curso.id} : ${response.statusText}`,
            );
        }

        return response;
    }

    async adicionar(curso: Curso): Promise<Response> {
        const response = await fetch(`${API_CURSO}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new RepositorioError(`Erro ao adicionar curso.`);
        }

        return response.json();
    }

    async todos(limit: number = 10, offset: number = 1): Promise<Curso[]> {
        const response = await fetch(`${API_CURSO}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            },
        });

        if (!response.ok) {
            throw new RepositorioError(`Erro ao buscar os cursos: ${response.statusText}`);
        }

        return response.json();
    }

    async buscarPorCurso(cursoId: Number): Promise<Curso[]> {
        const response = await fetch(`${API_CURSO}/${cursoId}/show`, {
            method: 'GET',
            body: JSON.stringify(cursoId),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new RepositorioError(
                `Erro ao buscar "curso" ID : ${cursoId} : ${response.statusText}`,
            );
        }

        return response.json();
    }

    async delete(cursoId: number): Promise<Response> {
        const response = await fetch(`${API_CURSO}/${cursoId}/show`, {
            method: 'DELETE',
            body: JSON.stringify(AudioWorkletNode),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new RepositorioError(
                `Erro ao deletar "curso" ID : ${cursoId} : ${response.statusText}`,
            );
        }

        return response;
    }

}
