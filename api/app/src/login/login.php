<?php
class Login {
  public $id; // int
  public $login; // string
  public $senha; // string


  public function __construct(
      $id = 0,
      $login = '',
      $senha = ''
  ) {
      $this->id = $id;
      $this->login = $login;
      $this->senha = $senha;
  }

  public function validar() {
    $todosErros = [];

    if( !$this->login ){
      array_push($todosErros, 'Login não definido!');
    }

    if( !$this->senha ){
      array_push($todosErros, 'Senha não definida!');
    }

    return $todosErros;
  }

  public function senhaComHash() {
    return hash( 'sha256', 'E1F53135E559C253 ' . $this->senha . ' 84B03D034B409D4E' );
  }
}