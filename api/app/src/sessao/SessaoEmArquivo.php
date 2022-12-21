<?php

  namespace App\Src\Sessao;


  class SessaoEmArquivo implements Sessao {
    const UM_DIA = 24*60*60;

    function sessaoIniciada() {
      return session_status() === PHP_SESSION_ACTIVE;
    }
    function iniciarSessao() {
      session_name('SID');
      session_set_cookie_params( [ 'lifetime' => self::UM_DIA, 'secure' => true, 'httponly' => true] );
      return session_start();
    }

    function destruirSessao() {
      session_destroy();
    }

    function regerarId() {
      session_regenerate_id();
    }

    function obterValor( $chave ) {
      return isset( $_SESSION[$chave] ) ? $_SESSION[$chave] : null;
    }

    function definirValor( $chave, $valor ) {
      $_SESSION[ $chave ] = $valor;
    }

    function logado() {
      return isset( $_SESSION['usuario'] );
    }
  }