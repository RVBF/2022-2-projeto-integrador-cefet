<?php

namespace App\Src\Aluno;

use App\Request;
use App\Src\AlunoCurso\AlunoCurso;
use App\Src\AlunoCurso\AlunoCursoRepositorioEmBDR;
use App\Src\Comum\Util;
use App\Src\Servico\ServicoVisao;
use App\Src\Curso\CursoRepositorioEMBDR;
use App\Src\Execao\RepositorioExcecao;

class AlunoControladora
{
  private $conexao = null;
  private $servicoVisao;
  private $colecaoAluno;
  private $colecaoCurso;
  private $colecaoAlunoCurso;
  public function __construct(&$db)
  {
    $this->conexao = $db;
    $this->servicoVisao = new ServicoVisao();
    $this->colecaoAluno = new AlunoRepositorioEmBDR($this->conexao);
    $this->colecaoCurso = new CursoRepositorioEMBDR($this->conexao);
    $this->colecaoAlunoCurso = new AlunoCursoRepositorioEmBDR($this->conexao);
    // $this->sessaoEmArquivo = new SessaoEmArquivo();

  }

  public function listar(Request $request)
  {
    try {
      $urlQuebrada  = explode('/', $request->base());
      $alunos = $this->colecaoAluno->todos(isset($urlQuebrada[2]) ? $urlQuebrada[2] : 10, isset($urlQuebrada[3]) ? $urlQuebrada : 1);
      
      $this->servicoVisao->responsePegaTodosSuccess($alunos);
      $this->servicoVisao->responseUpdateSuccess();
    } catch (\PDOException $errorPDO) {

      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositorioExcecao $error) {
      $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
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

      $this->servicoVisao->responseAddSuccess();
    } catch (\PDOException $errorPDO) {
      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositorioExcecao $error) {
      $this->servicoVisao->erroDoCliente(json_encode($error->getMessage()), 422);
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
      foreach ($this->colecaoAlunoCurso->comAlunoId($aluno->getId()) as $alunoCurso) {
        $this->colecaoAlunoCurso->deleteComCursoEAluno($alunoCurso->getCurso(), $aluno->getId());
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

      $this->servicoVisao->responseUpdateSuccess();
    } catch (\PDOException $errorPDO) {
      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositorioExcecao $error) {
      $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
    }
  }

  function delete(Request $request)
  {

    try {
      $urlQuebrada  = explode('/', $request->base());
      $aluno = $this->colecaoAluno->comId($urlQuebrada[2]);
      $this->colecaoAlunoCurso->deleteComIdAluno($aluno->getId());

      $this->colecaoAluno->delete($urlQuebrada[2]);
      $this->servicoVisao->responseDeleteSuccess();
    } catch (\PDOException $errorPDO) {
      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositorioExcecao $error) {
      $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
    }
  }

  function comId($request)
  {

    try {
      $urlQuebrada  = explode('/', $request->base());

      $aluno = $this->colecaoAluno->comId($urlQuebrada[2]);
      $aluno->setCursos($this->colecaoAlunoCurso->comAlunoId($aluno->getId()));

      $this->servicoVisao->responsePegaTodosSuccess($aluno);
    } catch (\PDOException $errorPDO) {
      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositorioExcecao $error) {
      $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
    }
  }

  function pegaProximoNumeroMatricula()
  {

    try {
      $proximoNumeroMatricula = $this->colecaoAluno->contagem() + 1;
      
      $sevicoMatricula = new ServicoMatricula($proximoNumeroMatricula);
      $proximoNumeroMatricula = $sevicoMatricula->formataMatricula();
      $this->servicoVisao->responsePegaTodosSuccess($proximoNumeroMatricula);
    } catch (\PDOException $errorPDO) {
      $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
    } catch (RepositorioExcecao $error) {
      $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
    }
  }
}
