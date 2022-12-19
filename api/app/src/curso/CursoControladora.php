<?php

namespace App\Src\Curso;

use App\RepositorioExcecao;
use App\Request;
use App\Src\Curso\CursoRepositorioEmBDR;
use App\Src\Comum\Util;
use App\Src\Funcionario\Funcionario;
use App\Src\Funcionario\FuncionarioRepositorioEmBDR;
use PDOException;

class CursoControladora
{
    private $conexao = null;
    private $colecaoCurso;
    private $colecaoFuncionario;

    public function __construct(&$db)
    {
        $this->conexao = $db;
        $this->colecaoCurso = new CursoRepositorioEmBDR($this->conexao);
        $this->colecaoFuncionario = new FuncionarioRepositorioEmBDR($this->conexao);
    }

    public function listar(Request $request)
    {
        try {
            $urlQuebrada  = explode('/', $request->base());
            $cursos = $this->colecaoCurso->todos(isset($urlQuebrada[2]) ? $urlQuebrada[2] : 10, isset($urlQuebrada[3]) ? $urlQuebrada : 1);

            Util::responsePegaTodosSuccess($cursos);
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

            $curso = new Curso(
                $data['id'],
                $data['codigo'],
                $data['nome'],
                $data['situacao'],
                $data['numeroAulas'],
                $data['dataInicio'],
                $data['dataFim'],
                new Funcionario($data['professor']['id'], $data['professor']['nome'], '', '', false, '')
            ); 

            $cursos = $this->colecaoCurso->adicionar($curso);

            Util::responseAddSuccess();
        } catch (PDOException $errorPDO) {
            Util::exibirErroAoConectar($errorPDO);
        } catch (RepositorioExcecao $error) {
            Util::erroDoCliente(json_encode(explode('|', $error->getMessage())), 422);
        }
    }

    function atualizar(Request $request)
    {
        try {
            $data = $request->all();
            $curso = $this->colecaoCurso->comId($data['id']);

            if($curso instanceof Curso) {
                $curso->setId($data["id"]);
                $curso->setCodigo($data["codigo"]);
                $curso->setNome($data["nome"]);
                $curso->setSituacao($data["situacao"]);
                $curso->setDataInicio($data["dataInicio"]);
                $curso->setDataFim($data["dataFim"]);
                $curso->setProfessor($this->colecaoFuncionario->comId($data['professor']['id']));
            }
            else{
                throw new RepositorioExcecao("Curso não encontrado na base da dados!");
            }

            $this->colecaoCurso->atualizar($curso);

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
            $this->colecaoCurso->delete($urlQuebrada[2]);
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
            $curso = $this->colecaoCurso->comId($urlQuebrada[2]);

            Util::responsePegaTodosSuccess($curso);
        } catch (PDOException $errorPDO) {
            Util::exibirErroAoConectar($errorPDO);
        } catch (RepositorioExcecao $error) {
            Util::exibirErroAoConsultar($error);
        }
    }
}
