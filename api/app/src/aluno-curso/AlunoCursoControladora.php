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
      
      $alunosCursos = $this->colecaoAlunoCurso->adicionar($alunoCurso);

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

      // $erros  = $alunoCurso->validar();
      // if(count($erros)) throw new \Exception("Existe erros de envio de dados!");

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
    $id = explode('/', $request->base())[1];

    try {
      $this->colecaoAlunoCurso->delete($id);

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

      Util::responseAddSuccess($alunoCurso->toArray());
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositoryException $error) {
      Util::exibirErroAoConsultar($error);
    }
  }
}
