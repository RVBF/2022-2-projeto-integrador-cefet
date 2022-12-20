import { appConfig } from '../config/config';
import { AlunoCurso } from './aluno-curso';
import { AlunoCursoError } from './aluno-curso-error';

const API_ALUNOCURSO = `${appConfig.api}/aluno-curso`;

/* eslint-disable max-len */
export class AlunoCursoRepositorio {
   async atualizar(AlunoCurso: AlunoCurso): Promise<Response> {
      const response = await fetch(`${API_ALUNOCURSO}/${AlunoCurso.id}`, {
         method: 'PUT',
         body: JSON.stringify(AlunoCurso),
         headers: {
            'content-type': 'application/json',
         },
      });
      
      
      if (!response.ok) {
         throw new AlunoCursoError('Não foi possível atualizar as notas!');
      }
      return response;
   }

   async adicionar(alunoCurso: AlunoCurso): Promise<Response> {
      return  await fetch(`${API_ALUNOCURSO}`, {
         method: 'POST',
         body: JSON.stringify(AlunoCurso),
         headers: {
            "Content-Type": "application/json;application/x-www-form-urlencoded;charset=UTF-8",
         },
      }).then(function (response) {

      if (!response.ok) {
      }
      return response.json();  
   })
     .catch(err =>{
      console.log(err);
         throw new Error(err.join('<br>'));
     });
   }

   async todos(limit: number | null, offset: number | null): Promise<AlunoCurso[]> {
      const response = await fetch(`${API_ALUNOCURSO}`, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json;charset=utf-8;'
         },
         // body: JSON.stringify({limit : limit, offset: offset})
      });
      if (!response.ok) {
         throw new AlunoCursoError(`Erro ao buscar as notas: ${response.statusText}`);
      }

      return response.json();
   }

   async buscarPorAlunoCurso(alunoId: Number): Promise<AlunoCurso[]> {
      const response = await fetch(`${API_ALUNOCURSO}/${alunoId}`, {
         method: 'GET',
      });

      if (!response.ok) {
         throw new AlunoCursoError(`Erro ao buscar aluno-curso ${alunoId} : ${response.statusText}`);
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
         throw new AlunoCursoError(
            `Erro ao deletar aluno-curso ID : ${alunoId} : ${response.statusText}`,
         );
      }

      return response;
   }

   async comId( id: number ): Promise<AlunoCurso> {
      
      const response = await fetch(`${API_ALUNOCURSO}/${id}`, {
         method: 'GET',
      });

      if (!response.ok) {
         throw new AlunoCursoError(`Erro ao buscar notas ${id} : ${response.statusText}`);
      }

      return response.json();
   }

}
