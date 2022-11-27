<?php

define('APP_INICIADO', microtime(true));
define('REMOTE_IP',    '127.0.0.1');
define('REMOTE_HOST',    '');
define('DEBUG_MODE',    true);

date_default_timezone_set('America/Sao_Paulo');



require 'vendor/autoload.php';

// Realiza ajustes para modo de depuração
if (!DEBUG_MODE) {

    // Modifica o retorno default do servidor para 500,
    // pois ele retorna 200 mesmo com erro no PHP
    http_response_code(500);

    // Desabilita a exibição de erros, por motivos de segurança
    ini_set('display_errors', 0);
}

require_once 'app/src/config/pdo-connection.php';

try {
	$db = PDOConnection::getInstance();
} catch (Exception $e) {
	print $e->getMessage();
  
}
require_once 'bootstrap.php';
require_once 'app/helpers/helper_routes.php';
resolve();
