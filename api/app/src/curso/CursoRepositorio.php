<?php

namespace App\Src\Curso;

require_once './Curso.php';


interface RepositorioCurso
{
   public function todos($tamanho = 0, $salto = 0);
   public function adicionar(Curso &$curso);
   public function atualizar(Curso &$curso);
   public function comId($id);
   public function delete($id);
}
