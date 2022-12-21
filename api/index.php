<?php


  define('APP_INICIADO', microtime(true));
  define('REMOTE_IP',    '127.0.0.1');
  define('REMOTE_HOST',    '');
  define('DEBUG_MODE',    true);
  date_default_timezone_set('America/Sao_Paulo');


  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: https://localhost:1234');
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
  }
  
  header('Authorization: true');
  header('Access-Control-Allow-Origin: https://localhost:1234');
  header('Access-Control-Allow-Credentials: true');
  header('Content-Type: application/x-www-form-urlencoded;application/json');


require 'vendor/autoload.php';
// require 'api/app/src/sessao/SessaoEmArquivo.php';
use App\Src\Sessao\SessaoEmArquivo;

$sessao = new SessaoEmArquivo();
if( !$sessao->sessaoIniciada() ){
  $sessao->iniciarSessao();
}
// Realiza ajustes para modo de depuração
if (!DEBUG_MODE) {

  // Modifica o retorno default do servidor para 500,
  // pois ele retorna 200 mesmo com erro no PHP
  http_response_code(500);

  // Desabilita a exibição de erros, por motivos de segurança
  ini_set('display_errors', 0);
}

require_once 'bootstrap.php';
require_once 'app/helpers/helper_routes.php';
resolve();
