<?php

namespace App\Src\Funcionario;

use App\Src\Comum\Util;
use App\Src\Execao\RepositorioExcecao;
use App\Src\Funcionario\Funcionario;
use PDO;

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
         $sql = 'SELECT id, nome, email, cpf, e_administrador FROM `funcionario`';
         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute();
         $result = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);
         foreach ($result as $row) {
            $objetos[] = $this->construirObjeto($row);
         }
         return $objetos;
      } catch (\PDOException $e) {
         throw new \PDOException($e->getMessage(), $e->getCode(), $e);
      }
   }

   public function todosProfessores($tamanho = 0, $salto = 0)
   {
      try {
         $objetos = [];
         $sql = 'SELECT id, nome, email, cpf, e_administrador FROM `funcionario` WHERE e_administrador = "0"';
         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute();
         $result = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);
         foreach ($result as $row) {
            $objetos[] = $this->construirObjeto($row);
         }
         return $objetos;
      } catch (\PDOException $e) {
         throw new \PDOException($e->getMessage(), $e->getCode(), $e);
      }
   }

   function adicionar(Funcionario &$funcionario)
   {
      try {
         $erros = $funcionario->validateAll([]);
			if (count($erros)) throw new RepositorioExcecao(implode('|', $erros));
         $sql = "INSERT INTO `pis-grupo1`.`funcionario` (`nome`, `cpf`, `email`, `senha`, `e_administrador`) VALUES (
               :nome,
               :cpf,
               :email,
               :senha,
               :e_administrador
          );
         ";

         $preparedStatement = $this->pdow->prepare($sql);

         $preparedStatement->execute([
            'nome' => $funcionario->getNome(),
            'cpf' =>  $funcionario->getCPF(),
            'email' => $funcionario->getEmail(),
            'senha' => $funcionario->senhaComHash(),
            'e_administrador' =>  ($funcionario->getEAdministrador()) ? 1 : 0
         ]);
      
         $funcionario->setId($this->pdow->lastInsertId());
      } catch (\PDOException $e) {
         throw new \PDOException($e->getMessage(), $e->getCode(), $e);
      } catch (RepositorioExcecao $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function atualizar(Funcionario &$funcionario)
   {
      try {
         $erros = [];
			if (count($erros)) throw new RepositorioExcecao((count($erros)) ? implode('|', $erros) : '');

         $sql = 'UPDATE `' . SELF::TABELA . '` SET
                   funcionario.nome = :nome,
                   funcionario.cpf = :cpf,
                   funcionario.email = :email,			 	
                   funcionario.e_administrador = :e_administrador
           WHERE  funcionario.id = :id';

         $preparedStatement = $this->pdow->prepare($sql);

        $preparedStatement->execute([
            'nome' => $funcionario->getNome(),
            'cpf' => $funcionario->getCpf(),
            'email' => $funcionario->getEmail(),
            'e_administrador' =>  ($funcionario->getEAdministrador()) ? '1' : '0',
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
         $sql = 'SELECT id, nome, email, cpf, e_administrador  FROM `funcionario`  WHERE `funcionario`.id = :id';

         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute(['id' => $id]);

         if ($preparedStatement->rowCount() < 1) {
            return null;
         }

         $result = $preparedStatement->fetch();

         return $this->construirObjeto($result);
      } catch (\PDOException $e) {

         throw new \PDOException($e->getMessage(), $e->getCode(), $e);
      }
   }

   function delete($id)
   {
      try {
         $sql = 'DELETE  FROM ' . self::TABELA . ' WHERE id = :id';
         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute(['id' => $id]);
      } catch (\PDOException $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function contagem()
   {
      try {
         $sql = 'SELECT COUNT(*) FROM `'.SELF::TABELA.'`';
         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute();

         if ($preparedStatement->rowCount() < 1) {
            return null;
         }

         $result = $preparedStatement->fetch();
      } catch (\Exception $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function construirObjeto(array $row)
   {
      return new Funcionario(
         $row['id'],
         $row['nome'],
         $row['cpf'],
         $row['email'],
         $row['e_administrador'],
         isset($row['senha']) ?  $row['senha'] : ''
      );
   }
}
