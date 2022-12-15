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
   const TABELA = 'aluno';
   function __construct(PDO &$pdow)
   {
      $this->pdow = $pdow;
   }

   public function todos($tamanho = 0, $salto = 0)
   {
      try {
         $objetos = [];
         $result = $this->pdow->query('SELECT  `' . SELF::TABELA . '`.*, `aluno_curso`.numero_matricula as matricula FROM `' . SELF::TABELA . '` LEFT JOIN `aluno_curso` on aluno_curso.aluno_id = aluno.id')->fetchAll();
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

         $sql = 'UPDATE `' . SELF::TABELA . '` SET
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
         Util::debug($executou);
      } catch (\PDOException $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
      catch (RepositorioExcecao $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   public function comId($id)
   {
      try {
         $sql ='SELECT `'. SELF::TABELA . '`.*  FROM `'. SELF::TABELA . '`  WHERE `'. SELF::TABELA . '`.id = :id';

         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute(['id' => $id]);

         if ($preparedStatement->rowCount() < 1) {
            return null;
         }

         $result = $preparedStatement->fetch();

         return $this->construirObjeto($result);
      } 
      catch (\PDOException $e) {
         throw new PDOException($e->getMessage(), $e->getCode(), $e);
      }
      catch (RepositorioExcecao $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function delete($id)
   {
      try {
         return $this->pdow->query('DELETE  FROM ' . self::TABELA . ' WHERE id = '. $id);
      } catch (\PDOException $e) {
         throw new PDOException($e->getMessage(), $e->getCode(), $e);
      }
      catch (RepositorioExcecao $e){
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function contagem()
   {
      try {
         return $this->pdo->rowCount(self::TABELA);
      } catch (\PDOException $e) {
         throw new PDOException($e->getMessage(), $e->getCode(), $e);
      }
      catch(RepositorioExcecao $e){
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
