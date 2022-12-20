<?php

namespace App\Src\Funcionario;

use App\Src\Execao\RepositorioExcecao;
use App\Request;
use App\Src\Servico\ServicoVisao;
use PDOException;
use RepositoryException;

class FuncionarioControladora
{
   private $conexao = null;
  private $servicoVisao;
   private $colecaoFuncionario;

   public function __construct(&$db)
   {
        $this->conexao = $db;
  $this->servicoVisao = new ServicoVisao();
      $this->colecaoFuncionario = new FuncionarioRepositorioEmBDR($this->conexao);
   }

   public function listar(Request $request)
   {
      try {
         $urlQuebrada  = explode('/', $request->base());
         $funcionarios = $this->colecaoFuncionario->todos(isset($urlQuebrada[2]) ? $urlQuebrada[2] : 10, isset($urlQuebrada[3]) ? $urlQuebrada : 1);

         $this->servicoVisao->responsePegaTodosSuccess($funcionarios);
         $this->servicoVisao->responseUpdateSuccess();
      } catch (PDOException $errorPDO) {
         $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
      } catch (RepositoryException $error) {
         $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
      }
   }

   public function listarProfessores(Request $request)
   {
      try {
         $urlQuebrada  = explode('/', $request->base());
         $funcionarios = $this->colecaoFuncionario->todosProfessores(isset($urlQuebrada[2]) ? $urlQuebrada[2] : 10, isset($urlQuebrada[3]) ? $urlQuebrada : 1);

         $this->servicoVisao->responsePegaTodosSuccess($funcionarios);
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
         $funcionario = new Funcionario(
            $data["id"],
            $data["nome"],
            $data["cpf"],
            $data["email"],
            $data["eAdministrador"],
            $data["senha"]
         );

         $funcionarios = $this->colecaoFuncionario->adicionar($funcionario);

         $this->servicoVisao->responseAddSuccess();
      } catch (PDOException $errorPDO) {
         $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
      } catch (RepositorioExcecao $error) {
         $this->servicoVisao->erroDoCliente($error->getMessage(), 422);
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
         $this->colecaoFuncionario->delete($urlQuebrada[2]);

         $this->servicoVisao->responseDeleteSuccess();
      } catch (PDOException $errorPDO) {
         $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
      } catch (RepositoryException $error) {
         $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
      }
   }

   function comId($request)
   {

      try {
         $urlQuebrada  = explode('/', $request->base());

         $funcionario = $this->colecaoFuncionario->comId($urlQuebrada[2]);
         $this->servicoVisao->responsePegaTodosSuccess($funcionario);
      } catch (PDOException $errorPDO) {
         $this->servicoVisao->exibirErroAoConectar($errorPDO->getMessage());
      } catch (RepositoryException $error) {
         $this->servicoVisao->exibirErroAoConsultar($error->getMessage());
      }
   }
}
