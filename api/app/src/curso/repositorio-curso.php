<?php
// require_once 'curso.php';


interface RepositorioCurso{
   public function todos($tamanho = 0, $salto = 0);
   public function adicionar(Curso &$curso);
   public function update(Curso &$curso);
   public function comId($id);
   public function delete($id);
} 

?>