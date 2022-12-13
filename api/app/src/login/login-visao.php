<?php

require_once 'app/src/pdo/repository-exception.php';

class LoginVisao
{
  function method()
  {
    return $_SERVER['REQUEST_METHOD'];
  }

  function path()
  {
    $dir = dirname($_SERVER['PHP_SELF']);
    return str_replace([$dir, '/api', '/login'], '', $_SERVER['REQUEST_URI']);
  }

  function autenticar()
  {
    return preg_match('/^\/autenticar\/?$/i', $this->path()) && $this->method() == 'POST';
  }

  function deslogar()
  {
    return preg_match('/^\/deslogar\/?$/i', $this->path()) && $this->method() == 'DELETE';
  }

  // DRAWS

  function responseLoginSuccess($dados)
  {
    http_response_code(200);
    echo json_encode($dados);
  }

  function responseDeslogarSuccess()
  {
    http_response_code(200);
    echo 'Usuário deslogado com sucesso!';
  }

  // ERRORS
  function exibirErroAoConectar($message)
  {
    echo $message, PHP_EOL;
    $this->RepositoryException('Ocorreu um erro ao conectar ao banco de dados. Por favor, contate o suporte.');
  }

  public function exibirErroAoConsultar(Exception $e)
  {
    http_response_code(500);
    die('Erro ao consultar o banco de dados: ' . $e->getMessage());
  }

  // GET PARAMS

  function formatHtmlEntities($key)
  {
    $data = json_decode(file_get_contents('php://input'), true);
    return htmlentities($data[$key], ENT_COMPAT, 'UTF-8');
  }

  function dataLogin()
  {
    $data = json_decode(file_get_contents('php://input'), true);

    if (!isset($data['login'], $data['senha'])) {
      $this->RepositoryException('Por favor, envie os dados corretos de um login.');
      die();
    }

    return new Login(0, $this->formatHtmlEntities('login'), $this->formatHtmlEntities('senha'));
  }
}
