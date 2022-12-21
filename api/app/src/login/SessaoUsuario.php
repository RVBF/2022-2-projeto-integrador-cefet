<?php

namespace App\Src\Login;

class SessaoUsuario {
  private $login;
  
  public function __construct( Login &$login  ) {
      $this->login = $login;
  }

  function sessaoFormatada() {
    return (object)[ 'id' => $this->login->getId(), 'nome' => $this->login->getNome(), 'e_administrador' => $this->login->getEAdministrador(), 'email' => $this->login->getLogin()];
  }
}
?>