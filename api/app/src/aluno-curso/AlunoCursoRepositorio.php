<?php
namespace App\Src\AlunoCurso;

interface AlunoCursoRepositorio{
   public function todos($tamanho = 0, $salto = 0);
   public function adicionar(AlunoCurso &$curso);
   public function atualizar(AlunoCurso &$curso);
   public function comId($id);
   public function delete($id);
}
