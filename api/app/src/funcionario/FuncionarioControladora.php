<?php

namespace App\Src\Funcionario;

use App\RepositorioExcecao;
use App\Request;
use App\Src\Comum\Util;
use PDOException;
use RepositoryException;

class FuncionarioControladora
{
   private $conexao = null;
   private $colecaoFuncionario;

   public function __construct(&$db)
   {
      $this->conexao = $db;
      $this->colecaoFuncionario = new FuncionarioRepositorioEmBDR($this->conexao);
   }

   public function listar(Request $request)
   {
      try {
         $urlQuebrada  = explode('/', $request->base());
         $funcionarios = $this->colecaoFuncionario->todos(isset($urlQuebrada[2]) ? $urlQuebrada[2] : 10, isset($urlQuebrada[3]) ? $urlQuebrada : 1);

         Util::responsePegaTodosSuccess($funcionarios);
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

         $funcionario = new Funcionario(
            $data["id"],
            $data["nome"],
            $data["cpf"],
            $data["email"],
            $data["eAdministrador"],
            $data["senha"]
         );

         $funcionarios = $this->colecaoFuncionario->adicionar($funcionario);

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
         $funcionario = $this->colecaoFuncionario->comId($data['id']);
         $funcionario->setNome($data["nome"]);
         $funcionario->setCpf($data["cpf"]);
         $funcionario->setEmail($data["email"]);
         $funcionario->setEAdministrador($data["eAdministrador"]);
         $funcionario->setSenha($data["senha"]);

         $this->colecaoFuncionario->atualizar($funcionario);

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
         $this->colecaoAluno->delete($urlQuebrada[2]);

         Util::responseDeleteSuccess();
      } catch (PDOException $errorPDO) {
         Util::exibirErroAoConectar($errorPDO);
      } catch (RepositoryException $error) {
         Util::exibirErroAoConsultar($error);
      }
   }

   function comId($request)
   {

      try {
         $urlQuebrada  = explode('/', $request->base());

         $funcionario = $this->colecaoFuncionario->comId($urlQuebrada[2]);
         Util::responsePegaTodosSuccess($funcionario->toArray());
      } catch (PDOException $errorPDO) {
         Util::exibirErroAoConectar($errorPDO);
      } catch (RepositoryException $error) {
         Util::exibirErroAoConsultar($error);
      }
   }
}
