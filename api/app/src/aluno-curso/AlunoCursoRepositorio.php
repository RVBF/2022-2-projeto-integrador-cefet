<?php
namespace App\Src\AlunoCurso;

interface RepositorioAlunoCurso{
   public function todos($tamanho = 0, $salto = 0);
   public function adicionar(AlunoCurso &$curso);
   public function update(AlunoCurso &$curso);
   public function comId($id);
   public function delete($id);
} 

?>