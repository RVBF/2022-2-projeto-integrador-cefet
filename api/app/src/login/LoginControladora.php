<?php

use App\Request;

require 'app/src/login/login.php';
require 'app/src/login/login-visao.php';
require 'app/src/login/login-repositorio-mysql.php';
require_once 'app/src/pdo/conexao.php';

class LoginControladora
{
  private $visao;
  private $servico;
  private $conexao = null;

  public function __construct(&$db)
  {
    $this->conexao = $db;

    $this->servico = new LoginRepositorioEmBDR($db);
  }

  function autenticar($request)
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

  function deslogar(Request $request)
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
