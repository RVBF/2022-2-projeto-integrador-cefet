<?php

namespace App\Src\Login;

use App\Src\Login\LoginExcecao;
use App\RepositorioExcecao;
use App\Request;
use App\Src\Comum\Util;
use App\Src\Sessao\SessaoEmArquivo;

class LoginControladora
{
  private $visao;
  private $servicoLogin;
  private $sessaoEmArquivo;
  private $conexao = null;

  public function __construct(&$db)
  {
    $this->conexao = $db;

    $this->servicoLogin = new LoginRepositorioEmBDR($db);
    $this->sessaoEmArquivo = new SessaoEmArquivo();
    $this->sessaoEmArquivo->iniciarSessao();
  }

  function autenticar(Request $request)
  {

    $data = $request->all();

    try {
      $login = new Login($data['login'], $data['senha']);

      $dados = $this->servicoLogin->login($login);
      $usuarioSessao =  new SessaoUsuario($login);

      $sessaoFormatada = $usuarioSessao->sessaoFormatada();

      $this->sessaoEmArquivo->definirValor('usuario', json_encode($sessaoFormatada));

      $this->sessaoEmArquivo->iniciarSessao();


      UTiL::responsePegaTodosSuccess($sessaoFormatada);
    } catch (\PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositorioExcecao $error) {
      Util::exibirErroAoConsultar($error->getMessage());
    }
    catch (LoginExcecao $error) {
      Util::erro($error,400);
    }
  }

  function deslogar(Request $request)
  {
    try {
      if (!$this->sessaoEmArquivo->sessaoIniciada()) throw new LoginExcecao("Não existe usuário logado");

      $this->sessaoEmArquivo->destruirSessao();

      Util::responseDeleteSuccess();
    } catch (LoginExcecao $error) {
      Util::erro($error->getMessage(), 400);
    }
  }
}
