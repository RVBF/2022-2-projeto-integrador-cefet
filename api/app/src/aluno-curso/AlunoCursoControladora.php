<?php

namespace App\Src\AlunoCurso;

use App\Request;
use App\Src\Comum\Util;
use App\Src\Servico\ServicoVisao;
use App\Src\Sessao\SessaoEmArquivo;
use PDOException;
use RepositoryException;

class AlunoCursoControladora
{
  private $conexao = null;
  private $colecaoAlunoCurso;
  private $servicoVisao;

  public function __construct(&$db)
  {
    $this->conexao = $db;
    $this->servicoVisao = new ServicoVisao();
    $this->colecaoAlunoCurso = new AlunoCursoRepositorioEmBDR($this->conexao);
  }

  public function listar(Request $request)
  {

    try {
      $urlQuebrada  = explode('/', $request->base());
      $alunosCursos = $this->colecaoAlunoCurso->todos(isset($urlQuebrada[2]) ? $urlQuebrada[2] : 10, isset($urlQuebrada[3]) ? $urlQuebrada : 1);

      $this->servicoVisao->responsePegaTodosSuccess($alunosCursos);
      $this->servicoVisao->responseUpdateSuccess();
    } catch (PDOException $errorPDO) {
      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositoryException $error) {
      $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
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

      $this->servicoVisao->responseAddSuccess();
    } catch (PDOException $errorPDO) {
      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositoryException $error) {
      $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
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
      $alunoCurso->setNotaAF($data["notaAF"]);
      $alunoCurso->setFaltas($data["faltas"]);
      $alunoCurso->setAluno($data["aluno"]);
      $alunoCurso->setCurso($data["curso"]);

      $this->colecaoAlunoCurso->atualizar($alunoCurso);

      $this->servicoVisao->responseUpdateSuccess();
    } catch (PDOException $errorPDO) {
      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositoryException $error) {
      $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
    }
  }

  function delete(Request $request)
  {
    try {
      $urlQuebrada  = explode('/', $request->base());
      $aluno_curso = $this->colecaoAlunoCurso->comId($urlQuebrada[2]);
      foreach ($aluno_curso->getCurso() as $alunoCurso) {
        $this->colecaoAlunoCurso->deleteComCursoEAluno($alunoCurso->getCurso(), $aluno_curso->getId());
      }
      $this->colecaoAlunoCurso->deleteComCursoEAluno($urlQuebrada[1], $urlQuebrada[2]);
      $this->servicoVisao->responseDeleteSuccess();
    } catch (PDOException $errorPDO) {
      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositoryException $error) {
      $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
    }
  }

  function comId(Request $request)
  {

    try {
      $id = explode('/', $request->base())[2];

      $alunoCurso = $this->colecaoAlunoCurso->comId($id); 
      
      $this->servicoVisao->responsePegaTodosSuccess($alunoCurso);
    } catch (PDOException $errorPDO) {
      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositoryException $error) {
      $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
    }
  }
}
