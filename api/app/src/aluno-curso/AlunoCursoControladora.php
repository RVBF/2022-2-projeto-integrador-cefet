<?php

namespace App\Src\AlunoCurso;

use App\Request;
use App\Src\Comum\Util;
use PDOException;
use RepositoryException;

class AlunoCursoControladora
{
  private $conexao = null;
  private $colecaoAlunoCurso;

  public function __construct(&$db)
  {
    $this->conexao = $db;
    $this->colecaoAlunoCurso = new AlunoCursoRepositorioEmBDR($this->conexao);
  }

  public function listar(Request $request)
  {

    try {
      $urlQuebrada  = explode('/', $request->base());
      $alunosCursos = $this->colecaoAlunoCurso->todos(isset($urlQuebrada[2]) ? $urlQuebrada[2] : 10, isset($urlQuebrada[3]) ? $urlQuebrada : 1);

      Util::responsePegaTodosSuccess($alunosCursos);
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

      $alunoCurso = new AlunoCurso(
        $data["id"],
        $data["matricula"],
        $data["av1"],
        $data["av2"],
        $data["notaAF"],
        $data["falta"],
        null,
        null
      );

      $this->colecaoAlunoCurso->adicionar($alunoCurso);

      Util::responseAddSuccess();
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      Util::exibirErroAoConsultar($error);
    }
  }

  function atualizar(Request $request)
  {

    try {
      $id = explode('/', $request->base())[1];

      $data = $request->all();

      $alunoCurso = $this->colecaoAlunoCurso->comId($data['id']);
      $alunoCurso->setmatricula($data["matricula"]);
      $alunoCurso->setAv1($data["av1"]);
      $alunoCurso->setAv2($data["av2"]);
      $alunoCurso->getNotaAF($data["notaAF"]);
      $alunoCurso->setFalta($data["falta"]);
      $alunoCurso->setAluno($data["aluno"]);
      $alunoCurso->setCurso($data["curso"]);

      $this->colecaoAlunoCurso->adicionar($alunoCurso);

      Util::responseUpdateSuccess();
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      Util::exibirErroAoConsultar($error);
    }
  }

  function delete(Request $request)
  {
    try {
      $urlQuebrada  = explode('/', $request->base());
      $aluno_curso = $this->colecaoAlunoCurso->comId($urlQuebrada[2]);
      foreach ($aluno_curso->getCurso() as $alunoCurso) {
        $this->colecaoAlunoCurso->delete($alunoCurso->getCurso(), $aluno_curso->getId());
      }
      $this->colecaoAlunoCurso->delete($urlQuebrada[1], $urlQuebrada[2]);
      Util::responseDeleteSuccess();
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      Util::exibirErroAoConsultar($error);
    }
  }

  function comId(Request $request)
  {

    try {
      $id = explode('/', $request->base())[1];
      $alunoCurso = $this->colecaoAlunoCurso->comId($id);
      Util::responseAddSuccess($alunoCurso);
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      Util::exibirErroAoConsultar($error);
    }
  }
}
