import { appConfig } from '../config/config';
import { Funcionario } from './funcionario';
import { FuncionarioError } from './funcionario-error';

const API_FUNCIONARIO = `${appConfig.api}/funcionario`;

/* eslint-disable max-len */
export class FuncionarioRepositorio {
    async atualizar(Funcionario: Funcionario): Promise<Response> {
        const response = await fetch(`${API_FUNCIONARIO}/${Funcionario.id}/edit`, {
            method: 'PUT',
            body: JSON.stringify(Funcionario),

            credentials: 'include',
        });
        const responseData = await response.json();

        if (!response.ok) {
            throw new FuncionarioError(responseData.error);
        }

        return responseData;
    }

    async adicionar(funcionario: Funcionario): Promise<Response> {
        const response = await fetch(`${API_FUNCIONARIO}`, {
            method: 'POST',
            body: JSON.stringify(funcionario),

            credentials: 'include',

        });

        if (response.status >= 400 && response.status <= 499) {
            const resposta = await response.text().then(errorMessage => {
                return errorMessage;
            })

            throw new FuncionarioError(`Erro ao cadastrar ${funcionario.nome} : ${String(JSON.parse(resposta).split('|').join('<br>'))}`);

        }

        return response.json();
    }

    async todos(limit: number | null, offset: number | null): Promise<Funcionario[]> {
        const response = await fetch(`${API_FUNCIONARIO}`, {
            method: 'GET',

            credentials: 'include',

            // body: JSON.stringify({limit : limit, offset: offset})
        });

        if (response.status < 200 && response.status > 299) {
            const resposta = await response.text().then(errorMessage => {
                return errorMessage;
            })

            throw new FuncionarioError(`Erro ao buscar lista de funcionários : ${String(JSON.parse(resposta).split('|').join('<br>'))}`);
        }


        return response.json();
    }


    async todosProfessores(): Promise<Funcionario[]> {
        const response = await fetch(`${API_FUNCIONARIO}/professores`, {
            method: 'GET',

            credentials: 'include',

        });

        if (response.status < 200 && response.status > 299) {
            const resposta = await response.text().then(errorMessage => {
                return errorMessage;
            })

            throw new FuncionarioError(`Erro ao buscar lista de professores : ${String(JSON.parse(resposta).split('|').join('<br>'))}`);
        }

        return response.json();
    }

    async buscarPorFuncionario(funcionarioId: Number): Promise<Funcionario> {
        const response = await fetch(`${API_FUNCIONARIO}/${funcionarioId}/show`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new FuncionarioError(`Erro ao buscar funcionário ${funcionarioId} : ${response.statusText}`);
        }

        return response.json();
    }

    async delete(funcionarioId: number): Promise<Response> {
        const response = await fetch(`${API_FUNCIONARIO}/${funcionarioId}`, {
            method: 'DELETE',
            body: JSON.stringify(AudioWorkletNode),

            credentials: 'include',
        });

        if (!response.ok) {
            throw new FuncionarioError(
                `Erro ao deletar funcionario ${funcionarioId} : ${response.statusText}`,
            );
        }

        return response;
    }

}
