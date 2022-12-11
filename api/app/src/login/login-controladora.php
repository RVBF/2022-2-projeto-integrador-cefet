<?php
require 'app/src/login/login.php';
require 'app/src/login/login-visao.php';
require 'app/src/login/login-repositorio-mysql.php';
require_once 'app/src/pdo/conexao.php';

class LoginControladora
{
  private $visao;
  private $servico;

  public function __construct()
  {
    $this->visao = new LoginVisao();

    $pdo = new Conexao();
    $pdoConn = $pdo->getConnection();
    $this->servico = new LoginRepositorioMysql($pdoConn);
  }

  public function init()
  {
    if ($this->visao->autenticar()) {
      $this->autenticar();
    } elseif ($this->visao->deslogar()) {
      $this->deslogar();
    }

    return true;
  }

  function autenticar()
  {
    $dataLogin = $this->visao->dataLogin();
    try {
      $dados = $this->servico->autenticar($dataLogin);
      $this->visao->responseLoginSuccess($dados);
    } catch (PDOException $errorPDO) {
      $this->visao->exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      $this->visao->exibirErroAoConsultar($error);
    }
  }

  function deslogar()
  {
    try {
      $this->servico->deslogar();
      $this->visao->responseDeslogarSuccess();
    } catch (PDOException $errorPDO) {
      $this->visao->exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      $this->visao->exibirErroAoConsultar($error);
    }
  }
}
