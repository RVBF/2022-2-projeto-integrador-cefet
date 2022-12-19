<?php
interface LoginRepositorio {
  function autenticar( $dadosLogin );
  function deslogar();
}