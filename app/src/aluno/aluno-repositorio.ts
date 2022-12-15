import { appConfig } from '../config/config';
import { Aluno } from './aluno';
import { AlunoError } from './aluno-error';

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
      const responseData = await response.json();

      if (!response.ok) {
         throw new AlunoError(responseData.error);
      }
      return responseData;
   }

   async adicionar(Aluno: Aluno): Promise<Response> {
      return  await fetch(`${API_ALUNO}`, {
         method: 'POST',
         body: JSON.stringify(Aluno),
         headers: {
            "Content-Type": "application/json;application/x-www-form-urlencoded;charset=UTF-8",
         },
      }).then(function (response) {

      if (!response.ok) {
         // throw new AlunoError(`Erro ao cadastrar ${Aluno.nome} : ${response}`);
      }
      return response.json();  
   })
     .catch(err =>{
      console.log(err);
         throw new Error(err.join('<br>'));
     });

      // if (!response.ok) {
      //    const erros = await response.json();
      //    throw new AlunoError(`Erro ao cadastrar ${Aluno.nome} : ${erros.join('<br>')}`);
      // }
      // else {
      //    return (response.status == 201) ? response.json() : null;
      // }
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

      if (!response.ok) {
         throw new AlunoError(`Erro ao buscar aviso ${alunoId} : ${response.statusText}`);
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
         throw new AlunoError(
            `Erro ao deletar "aluno" ID : ${alunoId} : ${response.statusText}`,
         );
      }

      return response;
   }

}
