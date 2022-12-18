import { appConfig } from '../config/config';
import { Aluno } from './aluno';
import { AlunoError } from './aluno-error';

const API_ALUNO = `${appConfig.api}/aluno`;

/* eslint-disable max-len */
export class AlunoRepositorio {
   async atualizar(aluno: Aluno): Promise<Response> {
      const response = await fetch(`${API_ALUNO}/${aluno.id}/edit`, {
         method: 'PUT',
         body: JSON.stringify(aluno),
         headers: {
            'content-type': 'application/json',
         },
      });
      
      if (response.status < 200 && response.status > 299) {
         const resposta = await response.text().then(errorMessage => {
            return errorMessage;
         })

         throw new AlunoError(`Erro ao cadastrar ${aluno.nome} : ${String(JSON.parse(resposta).split('|').join('<br>'))}`);

      }

      return response.json();
   }

   async adicionar(aluno: Aluno): Promise<Response> {
      const response = await fetch(`${API_ALUNO}`, {
         method: 'POST',
         body: JSON.stringify(aluno),
         headers: {
            "Content-Type": "application/json;application/x-www-form-urlencoded;charset=UTF-8",
         },
      })

      if (response.status < 200 && response.status > 299) {
         const resposta = await response.text().then(errorMessage => {
            return errorMessage;
         })

         throw new AlunoError(`Erro ao cadastrar ${aluno.nome} : ${String(JSON.parse(resposta).split('|').join('<br>'))}`);

      }

      return response.json();
   }

   async todos(limit: number | null, offset: number | null): Promise<Aluno[]> {
      const response = await fetch(`${API_ALUNO}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json;charset=utf-8;'
         },
         // body: JSON.stringify({limit : limit, offset: offset})
      });

      if (!response.ok) {
         throw new AlunoError(`Erro ao buscar os alunos: ${response.statusText}`);
      }

      return response.json();
   }

   async buscarPorAluno(alunoId: Number): Promise<Aluno> {
      const response = await fetch(`${API_ALUNO}/${alunoId}/show`, {
         method: 'GET',
      });

      if (response.status < 200 && response.status > 299) {
         const resposta = await response.text().then(errorMessage => {
            return errorMessage;
         })

         throw new AlunoError(`Erro ao buscar aluno de id ${alunoId} : ${String(JSON.parse(resposta).split('|').join('<br>'))}`);

      }

      return response.json();
   }

   async getProximaMatriculaDisponivel(): Promise<String> {
      const response = await fetch(`${API_ALUNO}/numero-para-matricula`, {
         method: 'GET',
      });

      
      if (response.status < 200 && response.status > 299) {
         throw new AlunoError(`Erro ao buscar um novo número de matrícula : ${response.statusText}`);
      }

      return response.json();

   }

   async delete(alunoId: number): Promise<Response> {
      const response = await fetch(`${API_ALUNO}/${alunoId}`, {
         method: 'DELETE',
         body: JSON.stringify(AudioWorkletNode),
         headers: {
            'content-type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new AlunoError(
            `Erro ao deletar "aluno" ID : ${alunoId} : ${response.statusText}`,
         );
      }

      return response;
   }

}
