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
         
         credentials: 'include',

      });


      if (!response.ok) {
         throw new AlunoCursoError('Não foi possível atualizar as notas!');
      }
      return response;
   }

   async adicionar(alunoCurso: AlunoCurso): Promise<Response> {
      return await fetch(`${API_ALUNOCURSO}`, {
         method: 'POST',
         body: JSON.stringify(AlunoCurso),
         
         credentials: 'include',

      }).then(function (response) {

         if (!response.ok) {
         }
         return response.json();
      })
         .catch(err => {
            console.log(err);
            //throw new Error(err.join('<br>'));
         });
   }

   async todos(limit: number | null, offset: number | null): Promise<AlunoCurso[]> {
      const usuarioLogado  = JSON.parse(String(localStorage.getItem('usuario')));
      let url  = (Number(usuarioLogado.item.e_administrador)) ? `${API_ALUNOCURSO}` : `${API_ALUNOCURSO}/professor/${usuarioLogado.item.id}`;
      const response = await fetch(url, {
         method: 'GET',
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

   async buscarPorCurso(cursoId: Number): Promise<AlunoCurso[]> {
      const response = await fetch(`${API_ALUNOCURSO}/curso/${cursoId}/show`, {
         method: 'GET',
      });

      if (!response.ok) {
         throw new AlunoCursoError(`Erro ao buscar aluno-curso ${cursoId} : ${response.statusText}`);
      }

      return response.json();
   }

   async delete(alunoId: number): Promise<Response> {
      const response = await fetch(`${API_ALUNOCURSO}/${alunoId}/show`, {
         method: 'DELETE',
         body: JSON.stringify(AlunoCurso),
         
         credentials: 'include',

      });

      if (!response.ok) {
         throw new AlunoCursoError(
            `Erro ao deletar aluno-curso ID : ${alunoId} : ${response.statusText}`,
         );
      }

      return response;
   }

   async comId(id: number): Promise<AlunoCurso> {

      const response = await fetch(`${API_ALUNOCURSO}/${id}/show`, {
         method: 'GET',
      });

      if (!response.ok) {
         throw new AlunoCursoError(`Erro ao buscar notas ${id} : ${response.statusText}`);
      }

      return response.json();
   }

}
