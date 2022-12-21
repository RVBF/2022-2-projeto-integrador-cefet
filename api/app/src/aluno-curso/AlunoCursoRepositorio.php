<?php
namespace App\Src\AlunoCurso;

interface AlunoCursoRepositorio{
   public function todos($tamanho = 0, $salto = 0);
   public function adicionarTodos(Array &$cursos);
   public function adicionar(AlunoCurso &$curso);
   public function atualizar(AlunoCurso &$curso);
   public function comId($id);
   public function comAlunoId($alunoId);
   public function comCursoId($alunoId);
   function delete($id);
   function deleteComCursoEAluno($cursoId, $alunoId);
   function deleteComIdAluno($alunoId);
}
