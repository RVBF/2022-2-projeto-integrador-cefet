<?php

namespace App\Src\Login;

use App\Src\Login\LoginExcecao;
use App\Src\Execao\RepositorioExcecao;
use App\Request;
use App\Src\Comum\Debuger;
use App\Src\Servico\ServicoVisao;
use App\Src\Sessao\SessaoEmArquivo;

class LoginControladora
{
  private $servicoLogin;
  private $sessaoEmArquivo;
  private $conexao = null;
  private $servicoVisao;
  private $sessao;

  public function __construct(&$db, &$sessao)
  {
    $this->conexao = $db;
    $this->servicoVisao = new ServicoVisao();
    $this->sessao = $sessao;
    $this->servicoLogin = new LoginRepositorioEmBDR($db);
  }

  function autenticar(Request $request)
  {

    $data = $request->all();

    try {
      $login = new Login($data['login'], $data['senha']);

      $dados = $this->servicoLogin->login($login);
      $usuarioSessao =  new SessaoUsuario($login);

      $sessaoFormatada = $usuarioSessao->sessaoFormatada();

      
      $this->sessao->regerarId();
      $this->sessao->definirValor('usuario', $sessaoFormatada);
      $this->servicoVisao->responsePegaTodosSuccess($sessaoFormatada);
    } catch (\PDOException $errorPDO) {
      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositorioExcecao $error) {
      $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
    } catch (LoginExcecao $error) {
      $this->servicoVisao->erro($error->getMessage(), 400);
    }
  }

  function deslogar(Request $request)
  {
    try {
      if (!$this->sessao->sessaoIniciada()) throw new LoginExcecao("Não existe usuário logado");

      $this->sessao->destruirSessao();

      $this->servicoVisao->responseDeleteSuccess();
    } catch (LoginExcecao $error) {
      $this->servicoVisao->erro($error->getMessage(), 400);
    }
  }
}
