import { API } from '../config/config.js';
import { AlunoCurso } from './aluno-curso.js';
import { RepositorioError } from '../repositorio-error.js';

const API_ALUNOCURSO = `${API}/aluno-curso`;

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

   async adicionar(AlunoCurso: AlunoCurso): Promise<Response> {
      const response = await fetch(`${API_ALUNOCURSO}`, {
         method: 'POST',
      });

      if (!response.ok) {
         throw new RepositorioError(`Erro ao adicionar uma nota.`);
      }

      return response.json();
   }

   async todos(limit: number = 10, offset: number = 1): Promise<AlunoCurso[]> {
      console.log('entrei');
      const response = await fetch(`${API_ALUNOCURSO}`,{
         method: 'GET',
         headers: {
           'Content-Type': 'application/json;charset=utf-8;'
         },
         // body: JSON.stringify({limit : limit, offset: offset})
       });
       console.log(response);
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
