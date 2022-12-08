import { appConfig } from '../config/config';
import { Aluno } from './aluno';
import { RepositorioError } from '../repositorio-error';

const API_ALUNO = `${appConfig.api}/aluno`;

/* eslint-disable max-len */
export class AlunoRepositorio {
   async atualizar(Aluno: Aluno): Promise<Response> {
      const response = await fetch(`${API_ALUNO}/${Aluno.id}/edit`, {
         method: 'PUT',
         body: JSON.stringify(Aluno),
         headers: {
            'content-type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new RepositorioError(
            `Erro ao atualizar ID : ${Aluno.id} : ${response.statusText}`,
         );
      }

      return response;
   }

   async adicionar(Aluno: Aluno): Promise<Response> {
      const response = await fetch(`${API_ALUNO}`, {
         method: 'POST',
      });

      if (!response.ok) {
         throw new RepositorioError(`Erro ao adicionar aluno.`);
      }

      return response.json();
   }

   async todos(limit: number = 10, offset: number = 1): Promise<Aluno[]> {
      console.log('entrei');
      const response = await fetch(`${API_ALUNO}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json;charset=utf-8;'
         },
         // body: JSON.stringify({limit : limit, offset: offset})
      });
      console.log(response);
      if (!response.ok) {
         throw new RepositorioError(`Erro ao buscar os alunos: ${response.statusText}`);
      }

      return response.json();
   }

   async buscarPorAluno(alunoId: Number): Promise<Aluno[]> {
      const response = await fetch(`${API_ALUNO}/${alunoId}/show`, {
         method: 'GET',
         body: JSON.stringify(alunoId),
         headers: {
            'content-type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new RepositorioError(
            `Erro ao buscar "aluno" ID : ${alunoId} : ${response.statusText}`,
         );
      }

      return response.json();
   }

   async delete(alunoId: number): Promise<Response> {
      const response = await fetch(`${API_ALUNO}/${alunoId}/show`, {
         method: 'DELETE',
         body: JSON.stringify(AudioWorkletNode),
         headers: {
            'content-type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new RepositorioError(
            `Erro ao deletar "aluno" ID : ${alunoId} : ${response.statusText}`,
         );
      }

      return response;
   }

}
