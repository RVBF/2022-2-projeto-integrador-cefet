import { appConfig } from '../config/config';
import { Curso } from './curso';
import { CursoError } from './curso-error';

const API_CURSO = `${appConfig.api}/curso`;

/* eslint-disable max-len */
export class CursoRepositorio {
    async atualizar(curso: Curso): Promise<Response> {
        const response = await fetch(`${API_CURSO}/${curso.id}/edit`, {
            method: 'PUT',
            body: JSON.stringify(curso),
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
        });

        if (response.status < 200 && response.status > 299) {
            const resposta = await response.text().then(errorMessage => {
                return errorMessage;
            })

            throw new CursoError(`Erro ao atualizar ${curso.nome} : ${String(JSON.parse(resposta).split('|').join('<br>'))}`);

        }

        return response.json();
    }

    async adicionar(curso: Curso): Promise<Response> {
        const response = await fetch(`${API_CURSO}`, {
            method: 'POST',
            body: JSON.stringify(curso),
            credentials: 'include',
            headers: {
                "Content-Type": "application/json;application/x-www-form-urlencoded;charset=UTF-8",
            },
        });


        if (response.status >= 400 && response.status <= 499) {
            const resposta = await response.text().then(errorMessage => {
                return errorMessage;
            })

            throw new CursoError(`Erro ao cadastrar ${curso.nome} : ${String(JSON.parse(resposta).split('|').join('<br>'))}`);

        }

        return response.json();
    }

    async todos(limit: number | null = 10, offset: number | null = 1): Promise<Curso[]> {
        const response = await fetch(`${API_CURSO}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            },
        });

        if (!response.ok) {
            throw new CursoError(`Erro ao buscar os cursos: ${response.statusText}`);
        }

        return response.json();
    }

    async buscarPorCurso(cursoId: Number): Promise<Curso> {
        const response = await fetch(`${API_CURSO}/${cursoId}/show`, {
            method: 'GET',
        });

        if (response.status < 200 && response.status > 299) {
            const resposta = await response.text().then(errorMessage => {
                return errorMessage;
            })

            throw new CursoError(`Erro ao buscar curso de id '${cursoId}': ${String(JSON.parse(resposta).split('|').join('<br>'))}`);

        }

        return response.json();
    }

    async delete(cursoId: number): Promise<Response> {
        const response = await fetch(`${API_CURSO}/${cursoId}`, {
            method: 'DELETE',
            body: JSON.stringify(AudioWorkletNode),
            credentials: 'include',
            headers: {
                'content-type': 'application/json',
            },
        });

        if (response.status < 200 && response.status > 299) {
            throw new CursoError(
                `Erro ao deletar "curso" ID : ${cursoId} : ${response.statusText}`,
            );
        }

        return response;
    }

}
