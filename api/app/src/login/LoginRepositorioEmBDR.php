<?php

namespace App\Src\Login;

use App\Src\Comum\Util;
use App\Src\Login\LoginExcecao;
use App\Src\Execao\RepositorioExcecao;
use App\Src\Servico\ServicoVisao;
use PDO;

class LoginRepositorioEmBDR implements LoginRepositorio
{
  public function __construct(PDO &$pdo)
  {
    $this->pdo = $pdo;
  }

  function login(Login &$login)
  {
    try {
      $todosErros = $login->validar();
      if (count($todosErros) > 0) {
        throw new \Exception("Existem erros que precisam ser corrigidos");
      }

      $sql  = 'SELECT id, nome, e_administrador FROM funcionario WHERE `email` = :email AND senha = :senha';
      $preparedStatement = $this->pdo->prepare($sql);
      $preparedStatement->execute(['email' => $login->getLogin(), 'senha' => $login->senhaComHash()]);

      if ($preparedStatement->rowCount() < 1) throw new LoginExcecao("Login ou senha incorretos!");
      
      $result = $preparedStatement->fetch(PDO::FETCH_ASSOC);
      $login->setId($result['id']);
      $login->setNome($result['nome']);
      $login->setEAdministrador($result['e_administrador']);
    } catch (RepositorioExcecao $e) {
      throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
    } catch (LoginExcecao $e) { {
        throw new LoginExcecao($e->getMessage(), $e->getCode(), $e);
      }
    }
  }
}
