<?php
namespace App\Src\Aluno;

use App\Src\Comum\Util;

class ServicoMatricula{
   private $matricula;

   public function __construct($matricula){
      $this->matricula =  (string) $matricula;
   }


   public function formataMatricula(){
      $matriculaParaCadastro = '000000';

      $indiceFinal = mb_strlen((string) $this->matricula) -1;

      for ($i=5; $indiceFinal >= 0 ; $i--) { 
         $matriculaParaCadastro[$i] = $this->matricula[$indiceFinal];
         
         $indiceFinal --;
      }
      return $matriculaParaCadastro;
   }
}