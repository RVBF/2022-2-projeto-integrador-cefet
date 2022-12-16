<?php

namespace App\Src\Funcionario;

use App\RepositorioExcecao;
use App\Src\Comum\Util;
use App\Src\Funcionario\Funcionario;
use PDO;
use PDOException;

class FuncionarioRepositorioEmBDR implements FuncionarioRepositorio
{
   private $pdow = null;
   const TABELA = 'funcionario';
   function __construct(PDO &$pdow)
   {
      $this->pdow = $pdow;
   }

   public function todos($tamanho = 0, $salto = 0)
   {
      try {
         $objetos = [];
         $sql = 'SELECT * FROM `funcionario`';
         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute();
         $result = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);
         foreach ($result as $row) {
            $objetos[] = $this->construirObjeto($row)->toArray();
         }
         return $objetos;
      } catch (\PDOException $e) {
         throw new PDOException($e->getMessage(), $e->getCode(), $e);
      }
   }

   function adicionar(Funcionario &$funcionario)
   {
      try {
         $erros = $funcionario->validateAll([]);
         if (count($erros) > 0) throw new RepositorioExcecao(implode('|', $erros));

         $sql = "INSERT INTO " . self::TABELA . " (`nome`, `cpf`, `email`, `e_administrador`, `senha`)
         VALUES (
         	:nome,
         	:cpf,
         	:email,
         	:e_administrador,
         	:senha,
         )";
         $preparedStatement = $this->pdow->prepare($sql);

         $preparedStatement->execute([
            'nome' => $funcionario->getNome(),
            'cpf' => $funcionario->getCpf(),
            'email' => $funcionario->getEmail(),
            'e_administrador' => $funcionario->getEAdministrador(),
            'senha' => $funcionario->getSenha(),
         ]);

         $funcionario->setId($this->pdow->lastInsertId());
      } catch (\PDOException $e) {
         throw new PDOException($e->getMessage(), $e->getCode(), $e);
      } catch (RepositorioExcecao $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function atualizar(Funcionario &$funcionario)
   {
      try {
         $erros = $funcionario->validateUpdate([]);
         if (count($erros) > 0) throw new RepositorioExcecao(implode('|', $erros));

         $sql = 'UPDATE `funcionario` SET
                  nome = :nome,
                  cpf = :cpf,
                  email = :email,			 	
                  e_administrador = :e_administrador
            WHERE id = :id';
         $preparedStatement = $this->pdow->prepare($sql);

         $executou = $preparedStatement->execute([
            'nome' => $funcionario->getNome(),
            'cpf' => $funcionario->getCpf(),
            'email' => $funcionario->getEmail(),
            'e_administrador' => $funcionario->getEAdministrador(),
            'id' => $funcionario->getId()
         ]);
      } catch (\PDOException $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      } catch (RepositorioExcecao $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   public function comId($id)
   {
      try {
         $sql = 'SELECT `funcionario`.*  FROM `funcionario`  WHERE `funcionario`.id = :id';

         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute(['id' => $id]);

         if ($preparedStatement->rowCount() < 1) {
            return null;
         }

         $result = $preparedStatement->fetch();

         return $this->construirObjeto($result);
      } catch (\PDOException $e) {

         throw new PDOException($e->getMessage(), $e->getCode(), $e);
      }
   }

   function delete($id)
   {
      try {
         return $this->pdow->query('DELETE  FROM ' . self::TABELA . ' WHERE id = ' . $id);
      } catch (\PDOException $e) {
         throw new PDOException($e->getMessage(), $e->getCode(), $e);
      } catch (RepositorioExcecao $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function contagem()
   {
      try {
         return $this->pdo->rowCount(self::TABELA);
      } catch (\PDOException $e) {
         throw new PDOException($e->getMessage(), $e->getCode(), $e);
      } catch (RepositorioExcecao $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function construirObjeto(array $row)
   {
      return new Funcionario(
         $row['id'],
         $row['nome'],
         $row['email'],
         $row['cpf'],
         $row['e_administrador']
      );
   }
}
