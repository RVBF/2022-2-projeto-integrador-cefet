<?php

namespace App\Src\Aluno;

use App\Request;
use App\Src\Comum\Util;
use PDOException;
use RepositoryException;

class AlunoController
{
  private $conexao = null;
  private $colecaoAluno;

  public function __construct(&$db)
  {
    $this->conexao = $db;
    $this->colecaoAluno = new RepositorioAlunoEMBDR($this->conexao);
  }

  public function listar(Request $request)
  {
    try {
      $urlQuebrada  = explode('/', $request->base());
      $alunos = $this->colecaoAluno->todos(isset($urlQuebrada[2]) ? $urlQuebrada[2] : 10, isset($urlQuebrada[3]) ? $urlQuebrada : 1);

      Util::responsePegaTodosSuccess($alunos);
      Util::responseUpdateSuccess();
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      Util::exibirErroAoConsultar($error);
    }
  }

  function cadastrar(Request $request)
  {

    try {
      $data = $request->all();
      $aluno = new aluno(
        $data["id"],
        $data["matricula"],
        $data["nome"],
        $data["cpf"],
        $data["telefone"],
        $data["email"]
      );

      $alunos = $this->colecaoAluno->adicionar($aluno);

      Util::responseAddSuccess();
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      Util::exibirErroAoConsultar($error);
    }
  }

  function update(Request $request)
  {

    try {
      $data = $request->all();

      $aluno = $this->colecaoAluno->comId($data['id']);
      $aluno->setMatricula($data["matricula"]);
      $aluno->setNome($data["nome"]);
      $aluno->setCpf($data["cpf"]);
      $aluno->setTelefone($data["telefone"]);
      $aluno->setEmail($data["email"]);

      $this->colecaoAluno->adicionar($aluno);

      Util::responseUpdateSuccess();
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      Util::exibirErroAoConsultar($error);
    }
  }

  function delete($id)
  {

    try {

      $this->colecaoAluno->delete($id);

      Util::responseDeleteSuccess();
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      Util::exibirErroAoConsultar($error);
    }
  }

  function comId($id)
  {

    try {

    $aluno = $this->colecaoAluno->comId($id);

      Util::responseAddSuccess($aluno->toArray());
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      Util::exibirErroAoConsultar($error);
    }
  }
}
