import { appConfig } from '../config/config';
import { Funcionario } from './funcionario';
import { RepositorioError } from '../repositorio-error';

const API_FUNCIONARIO = `${appConfig.api}/funcionario`;

/* eslint-disable max-len */
export class FuncionarioRepositorio {
    async atualizar(Funcionario: Funcionario): Promise<Response> {
        const response = await fetch(`${API_FUNCIONARIO}/${Funcionario.id}/edit`, {
            method: 'PUT',
            body: JSON.stringify(Funcionario),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new RepositorioError(
                `Erro ao atualizar ID : ${Funcionario.id} : ${response.statusText}`,
            );
        }

        return response;
    }

    async adicionar(Funcionario: Funcionario): Promise<Response> {
        const response = await fetch(`${API_FUNCIONARIO}`, {
            method: 'POST',
        });

        if (!response.ok) {
            throw new RepositorioError(`Erro ao adicionar funcionário.`);
        }

        return response.json();
    }

    async todos(limit: number = 10, offset: number = 1): Promise<Funcionario[]> {
        const response = await fetch(`${API_FUNCIONARIO}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            },
            // body: JSON.stringify({limit : limit, offset: offset})
        });

        if (!response.ok) {
            throw new RepositorioError(`Erro ao buscar os funcionários: ${response.statusText}`);
        }

        return response.json();
    }

    async buscarPorFuncionario(funcionarioId: Number): Promise<Funcionario> {
        const response = await fetch(`${API_FUNCIONARIO}/${funcionarioId}/show`, {
            method: 'GET',
            body: JSON.stringify(funcionarioId),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new RepositorioError(
                `Erro ao buscar "funcionário" ID : ${funcionarioId} : ${response.statusText}`,
            );
        }

        return response.json();
    }

    async delete(funcionarioId: number): Promise<Response> {
        const response = await fetch(`${API_FUNCIONARIO}/${funcionarioId}/show`, {
            method: 'DELETE',
            body: JSON.stringify(AudioWorkletNode),
            headers: {
                'content-type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new RepositorioError(
                `Erro ao deletar "funcionario" ID : ${funcionarioId} : ${response.statusText}`,
            );
        }

        return response;
    }

}
