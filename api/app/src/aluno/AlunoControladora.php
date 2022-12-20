<?php

namespace App\Src\Aluno;

use App\RepositorioExcecao;
use App\Request;
use App\Src\AlunoCurso\AlunoCurso;
use App\Src\AlunoCurso\AlunoCursoRepositorioEmBDR;
use App\Src\Comum\Util;
use App\Src\Curso\CursoRepositorioEMBDR;
use PDOException;

class AlunoControladora
{
  private $conexao = null;
  private $colecaoAluno;
  private $colecaoCurso;
  private $colecaoAlunoCurso;

  public function __construct(&$db)
  {
    $this->conexao = $db;
    $this->colecaoAluno = new AlunoRepositorioEmBDR($this->conexao);
    $this->colecaoCurso = new CursoRepositorioEMBDR($this->conexao);
    $this->colecaoAlunoCurso = new AlunoCursoRepositorioEmBDR($this->conexao);
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
    } catch (RepositorioExcecao $error) {
      Util::exibirErroAoConsultar($error);
    }
  }

  function cadastrar(Request $request)
  {
    try {

      $data = $request->all();
      $proximoNumeroMatricula = $this->colecaoAluno->contagem() + 1;

      $sevicoMatricula = new ServicoMatricula($proximoNumeroMatricula);
      $proximoNumeroMatricula = $sevicoMatricula->formataMatricula();
      $aluno = new Aluno(
        $data["id"],
        $proximoNumeroMatricula,
        $data["nome"],
        $data["cpf"],
        $data["telefone"],
        $data["email"]
      );

      $this->colecaoAluno->adicionar($aluno);

      $cursosCodigos =  [];
      foreach ($data['cursos'] as $key => $curso) {
        $cursosCodigos[] = $curso['codigo'];
      }

      $cursos = $this->colecaoCurso->comCodigos($cursosCodigos);
      $alunosCursos = [];

      foreach ($cursos as $curso) {
        $alunosCursos[] = new AlunoCurso(
          0,
          $aluno->getMatricula(),
          null,
          null,
          null,
          0,
          $aluno,
          $curso
        );
      }

      $this->colecaoAlunoCurso->adicionarTodos($alunosCursos);

      Util::responseAddSuccess();
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositorioExcecao $error) {
      Util::erroDoCliente(json_encode($error->getMessage()), 422);
    }
  }

  function atualizar(Request $request)
  {
    try {
      $data = $request->all();
      $aluno = $this->colecaoAluno->comId($data['id']);
      $aluno->setMatricula($data["matricula"]);
      $aluno->setNome($data["nome"]);
      $aluno->setCpf($data["cpf"]);
      $aluno->setTelefone($data["telefone"]);
      $aluno->setEmail($data["email"]);
      $this->colecaoAluno->atualizar($aluno);
      foreach($this->colecaoAlunoCurso->comAlunoId($aluno->getId()) as $alunoCurso){
        $this->colecaoAlunoCurso->delete($alunoCurso->getCurso(), $aluno->getId());
      }

      $cursosCodigos =  [];
      foreach ($data['cursos'] as $key => $curso) {
        $cursosCodigos[] = $curso['codigo'];
      }
      
      $cursos = $this->colecaoCurso->comCodigos($cursosCodigos);
      $alunosCursos = [];

      foreach ($cursos as $curso) {
        $alunosCursos[] = new AlunoCurso(
          0,
          $aluno->getMatricula(),
          null,
          null,
          null,
          0,
          $aluno,
          $curso
        );
      }

      $this->colecaoAlunoCurso->adicionarTodos($alunosCursos);

      Util::responseUpdateSuccess();
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositorioExcecao $error) {
      Util::exibirErroAoConsultar($error);
    }
  }

  function delete(Request $request)
  {

    try {
      $urlQuebrada  = explode('/', $request->base());
      $aluno = $this->colecaoAluno->comId($urlQuebrada[2]);
      foreach($aluno->getCursos() as $alunoCurso){
        $this->colecaoAlunoCurso->delete($alunoCurso->getCurso(), $aluno->getId());
      }
      $this->colecaoAluno->delete($urlQuebrada[2]);
      Util::responseDeleteSuccess();
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositorioExcecao $error) {
      Util::exibirErroAoConsultar($error);
    }
  }

  function comId($request)
  {

    try {
      $urlQuebrada  = explode('/', $request->base());

      $aluno = $this->colecaoAluno->comId($urlQuebrada[2]);
      $todosCursosAluno = $this->colecaoAlunoCurso->comAlunoId($aluno->getId());
      $aluno->setCursos( $todosCursosAluno );
      foreach ($aluno->getCursos() as $alunoCurso) {
        $cursoAluno = $alunoCurso->getCurso();
        $pegaComId = $this->colecaoCurso->comId( $cursoAluno );
        $alunoCurso->setCurso( $pegaComId );
      }

      Util::responsePegaTodosSuccess($aluno);
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositorioExcecao $error) {
      Util::exibirErroAoConsultar($error);
    }
  }

  function pegaProximoNumeroMatricula()
  {

    try {
      $proximoNumeroMatricula = $this->colecaoAluno->contagem() + 1;

      $sevicoMatricula = new ServicoMatricula($proximoNumeroMatricula);
      $proximoNumeroMatricula = $sevicoMatricula->formataMatricula();
      Util::responsePegaTodosSuccess($proximoNumeroMatricula);
    } catch (PDOException $errorPDO) {
      Util::exibirErroAoConectar($errorPDO);
    } catch (RepositorioExcecao $error) {
      Util::exibirErroAoConsultar($error);
    }
  }
}
