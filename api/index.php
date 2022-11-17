<?php
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
header('Access-Control-Allow-Origin: https://localhost:5500');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

function path()
{
    $dir = dirname($_SERVER['PHP_SELF']);
    $caminho = str_replace([$dir, '/api'], '', $_SERVER['REQUEST_URI']);
    return $caminho;
}

if (preg_match('/^(\/)?login/i', path())) {
}

if (preg_match('/^(\/)?avisos/i', path())) {

    $avisoControladora = new AvisoControladora();

    if (!$avisoControladora->visao->findByUrgencia() && !$sessao->logado()) {
        return;
    }

    if (!($avisoControladora->init()
    )) {
        http_response_code(404);
        die('Não encontrado.');
    }
    return;
}
if (preg_match('/^(\/)?setores/i', path()) && $sessao->logado()) {
    $setorControladora = new SetorControladora();
    if (!($setorControladora->init()
    )) {
        http_response_code(404);
        die('Não encontrado.');
    }
    return;
}
if (preg_match('/^(\/)?usuarios/i', path()) && $sessao->logado()) {
    $usuarioControladora = new UsuarioControladora();

    if (!($usuarioControladora->init()
    )) {
        http_response_code(404);
        die('Não encontrado.');
    }
    return;
}

if (preg_match('/^(\/)?configuracao/i', path())) {
    $configuracaoControladora = new configuracaoControladora();
    if (!($configuracaoControladora->init()
    )) {
        http_response_code(404);
        die('Não encontrado.');
    }
    return;
}
