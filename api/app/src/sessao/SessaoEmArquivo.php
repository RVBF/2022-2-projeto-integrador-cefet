<?php

  namespace App\Src\Sessao;


  class SessaoEmArquivo implements Sessao {
    function sessaoIniciada() {
      return session_status() === PHP_SESSION_ACTIVE;
    }
    function iniciarSessao() {
      session_name( 'SID' ); // Chave do cookie
      // session_set_cookie_params([ 'lifetime' => time() + 60 * 10, 'secure' => true, 'httponly' => true]);
      session_set_cookie_params(
        time() + 60 * 10, // 10 min 
        null, null, true, true );
      session_start();
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