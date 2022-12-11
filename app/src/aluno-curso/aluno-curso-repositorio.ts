import { appConfig } from '../config/config';
import { AlunoCurso } from './aluno-curso';
import { RepositorioError } from '../repositorio-error';

const API_ALUNOCURSO = `${appConfig.api}/aluno-curso`;

/* eslint-disable max-len */
export class AlunoCursoRepositorio {
   async atualizar(AlunoCurso: AlunoCurso): Promise<Response> {
      const response = await fetch(`${API_ALUNOCURSO}/${AlunoCurso.id}/edit`, {
         method: 'PUT',
         body: JSON.stringify(AlunoCurso),
         headers: {
            'content-type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new RepositorioError(
            `Erro ao atualizar ID : ${AlunoCurso.id} : ${response.statusText}`,
         );
      }

      return response;
   }

   async adicionar(alunoCurso: AlunoCurso): Promise<Response> {

      const response = await fetch(`${API_ALUNOCURSO}`, {
         method: "POST",
         body: JSON.stringify(alunoCurso),
         headers: {
            "Content-Type": "application/json;application/x-www-form-urlencoded;charset=UTF-8",
         },
       
      });

      if (!response.ok) {
         throw new RepositorioError(`Erro ao adicionar uma nota.`);
      }

      return response.json();
   }

   async todos(limit: number = 10, offset: number = 1): Promise<AlunoCurso[]> {
      const response = await fetch(`${API_ALUNOCURSO}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json;charset=utf-8;'
         },
         // body: JSON.stringify({limit : limit, offset: offset})
      });
      if (!response.ok) {
         throw new RepositorioError(`Erro ao buscar as notas: ${response.statusText}`);
      }

      return response.json();
   }

   async buscarPorAluno(alunoId: Number): Promise<AlunoCurso[]> {
      const response = await fetch(`${API_ALUNOCURSO}/${alunoId}/show`, {
         method: 'GET',
         body: JSON.stringify(alunoId),
         headers: {
            'content-type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new RepositorioError(
            `Erro ao buscar "aluno-curso" ID : ${alunoId} : ${response.statusText}`,
         );
      }

      return response.json();
   }

   async delete(alunoId: number): Promise<Response> {
      const response = await fetch(`${API_ALUNOCURSO}/${alunoId}/show`, {
         method: 'DELETE',
         body: JSON.stringify(AlunoCurso),
         headers: {
            'content-type': 'application/json',
         },
      });

      if (!response.ok) {
         throw new RepositorioError(
            `Erro ao deletar aluno-curso ID : ${alunoId} : ${response.statusText}`,
         );
      }

      return response;
   }

}
