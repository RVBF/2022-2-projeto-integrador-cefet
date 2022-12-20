<?php
namespace App\Src\Login;

interface LoginRepositorio {
  function login(Login &$login);
}