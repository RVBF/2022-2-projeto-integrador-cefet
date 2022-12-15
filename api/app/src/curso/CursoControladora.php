<?php

namespace App\Src\Curso;

use App\RepositorioExcecao;
use App\Request;
use App\Src\Curso\CursoRepositorioEmBDR;
use App\Src\Comum\Util;
use PDOException;

class CursoControladora
{
    private $conexao = null;
    private $colecaoCurso;

    public function __construct(&$db)
    {
        $this->conexao = $db;
        $this->colecaoCurso = new CursoRepositorioEmBDR($this->conexao);
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

            $curso = new curso(
                'id',
                'codigo',
                'nome',
                'situacao',
                'dataInicio',
                'dataFim',
                'professor_id'
            );

            $cursos = $this->colecaoAluno->adicionar($curso);

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
            $curso->setId($data["id"]);
            $curso->setCodigo($data["codigo"]);
            $curso->setNome($data["nome"]);
            $curso->setSituacao($data["situacao"]);
            $curso->setDataInicio($data["dataInicio"]);
            $curso->setDataFim($data["dataFim"]);
            $curso->setProfessor($data["professor"]);

            $this->colecaoCurso->atualizar($curso);

            Util::responseUpdateSuccess();
        } catch (PDOException $errorPDO) {
            Util::exibirErroAoConectar($errorPDO);
        } catch (RepositorioExcecao $error) {
            Util::exibirErroAoConsultar($error);
        }
    }

    function delete($id)
    {
        try {
            $this->colecaoCurso->delete($id);
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
            Util::responsePegaTodosSuccess($curso->toArray());
        } catch (PDOException $errorPDO) {
            Util::exibirErroAoConectar($errorPDO);
        } catch (RepositorioExcecao $error) {
            Util::exibirErroAoConsultar($error);
        }
    }
}
