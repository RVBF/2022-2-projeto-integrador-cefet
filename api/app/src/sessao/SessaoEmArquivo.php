<?php

namespace App\Src\Sessao;

use App\Request;
use App\Src\Comum\Util;
use App\Src\Sessao\Sessao;


class SessaoEmArquivo implements Sessao
{
  private $request;
  const UM_DIA = 24 * 60 * 60;

  function sessaoIniciada()
  {
    return session_status() === PHP_SESSION_ACTIVE;
  }

  function iniciarSessao()
  {
    if ($this->sessaoIniciada()) $this->regerarId();

    if (!isset($_SESSION)) {
      session_start();
      setcookie(session_name(),session_id(),self::UM_DIA);
    }
  }

  function destruirSessao()
  {
    session_destroy();
  }

  function regerarId()
  {
    session_regenerate_id(true);
  }

  function obterValor($chave)
  {
    return isset($_SESSION[$chave]) ? $_SESSION[$chave] : null;
  }

  function definirValor($chave, $valor)
  {
    $_SESSION[$chave] = $valor;
  }
}
