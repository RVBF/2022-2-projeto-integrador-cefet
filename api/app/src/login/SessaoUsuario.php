<?php
class SessaoUsuario {
  public $id; // int
  public $nome; // string
  public $sobrenome; // string
  public $perfil; // string
  public $setorId; // string
  
  
  public function __construct(
      $id = 0,
      $nome = '',
      $sobrenome = '',
      $perfil = '',
      $setorId = 0
  ) {
      $this->id = $id;
      $this->nome = $nome;
      $this->sobrenome = $sobrenome;
      $this->perfil = $perfil;
      $this->setorId = $setorId;
      
  }

  function sessaoFormatada() {
    return [ 'id' => $this->id, 'nome' => $this->nome.' '.$this->sobrenome, 'setorId' => $this->setorId, 'perfil' => $this->perfil ];
  }
}
?>