<?php

namespace App\Src\Comum;

use Exception;

abstract class Util
{

   static function debug($data)
   {
      echo "<pre>";
      print_r($data);
      echo "</pre>";
      // exit;
   }
   static function responsePegaTodosSuccess($data)
   {
      http_response_code(200);
      print json_encode($data);
   }

   static function print_json($mixed, $with_headers = true)
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

   static function responseAddSuccess()
   {
      http_response_code(201);
   }

   static function responseDeleteSuccess()
   {
      http_response_code(200);
   }

   static function responseClonarSuccess()
   {
      http_response_code(201);
   }

   static function responseUpdateSuccess()
   {
      http_response_code(200);
   }

   // ERRORS
   static function exibirErroAoConectar($message)
   {
      echo $message, PHP_EOL;
      self::erroDoServidor('Ocorreu um erro ao conectar ao banco de dados. Por favor, contate o suporte.');
   }

   static function exibirErroAoConsultar($erro)
   {
      http_response_code(422);
      // self::erroDoCliente($erro);
      die(json_encode('Erro ao consultar o banco de dados: ' . $erro->getMessage()));
   }

   static function erroDoServidor($mensagem, $codigo = 500)
   {
      self::erro($mensagem, $codigo);
   }

   static function erroDoCliente($mensagem, $codigo = 400)
   {
      self::erro($mensagem, $codigo);
   }

   static function erro($mensagem, $codigo)
   {
      http_response_code($codigo);
      echo json_decode($mensagem, true);
      die();
   }
}
