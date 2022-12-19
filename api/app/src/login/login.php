<?php

namespace App\Src\Login;

class Login
{
  private $id; // int
  private $nome; // string
  private $login; // string
  private $senha; // string
  private $eAdministrador; // string


  public function __construct(
    $login = '',
    $senha = ''
  ) {
    $this->login = $login;
    $this->senha = $senha;
  }


  public function getId(){
    return $this->id;
  }

  public function setId($id){
    return $this->id  = $id;
  }

  public function getNome(){
    return $this->nome;
  }

  public function setNome($nome){
    return $this->nome  = $nome;
  }

  public function getLogin(){
    return $this->login;
  }

  public function setLogin($login){
    return $this->login  = $login;
  }

  public function getSenha(){
    return $this->senha;
  }

  public function setSenha($senha){
    return $this->senha  = $senha;
  }

  public function getEAdministrador(){
    return $this->eAdministrador;
  }

  public function setEAdministrador($eAdministrador){
    return $this->eAdministrador  = $eAdministrador;
  }

  public function validar()
  {
    $todosErros = [];

    if (!$this->login) {
      array_push($todosErros, 'Login não definido!');
    }

    if (!$this->senha) {
      array_push($todosErros, 'Senha não definida!');
    }

    return $todosErros;
  }

  public function senhaComHash()
  {
    return hash('sha256', 'E1F53135E559C253 ' . $this->senha . ' 84B03D034B409D4E');
  }
}
