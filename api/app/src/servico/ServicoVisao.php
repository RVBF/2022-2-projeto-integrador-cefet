<?php

namespace App\Src\Servico;

use phputil\JSON as PhputilJSON;
use phputil\json\JSON;
class ServicoVisao
{
   
   public function responsePegaTodosSuccess($data)
   {
      http_response_code(200);
      print PhputilJSON::encode($data);
   }

   public function print_json($mixed, $with_headers = true)
   {
      if (!is_array($mixed) && !is_object($mixed)) {
         $mixed = array($mixed);
      }

      $json = json_encode($mixed);

      if ($with_headers) {
         header('Cache-control: no-cache, must-revalidate');
         header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
         header('Content-type: application/json; charset=UTF-8');
      }

      return $json;
   }

   public function responseAddSuccess()
   {
      die(PhputilJSON::encode('Cadastro Realizado Com Sucesso!'));
      http_response_code(201);
   }

   public function responseDeleteSuccess()
   {
      http_response_code(200);
   }

   public function responseClonarSuccess()
   {
      http_response_code(201);
   }

   public function responseUpdateSuccess()
   {
      http_response_code(200);
   }

   // ERRORS
   public function exibirErroAoConectar($message)
   {
      echo $message, PHP_EOL;
      self::erroDoServidor('Ocorreu um erro ao conectar ao banco de dados. Por favor, contate o suporte.');
   }

   public function exibirErroAoConsultar($erro)
   {
      http_response_code(400);
      die(PhputilJSON::encode('Erro ao consultar o banco de dados: ' . $erro->getMessage()));
   }

   public function erroDoServidor($mensagem, $codigo = 500)
   {
      self::erro($mensagem, $codigo);
   }

   public function erroDoCliente($mensagem, $codigo = 400)
   {
      self::erro($mensagem, $codigo);
   }

   public function erro($mensagem, $codigo)
   {
      http_response_code($codigo);
      echo PhputilJSON::encode($mensagem);
      die();
   }
}
