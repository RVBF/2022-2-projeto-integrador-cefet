<?php
namespace App\Src\Sessao;

interface Sessao {
  function iniciarSessao();
  function destruirSessao();
  function regerarId();
  function definirValor($chave, $valor);
  function obterValor($chave);
  function sessaoIniciada();
}