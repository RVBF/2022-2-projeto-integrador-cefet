<?php

namespace App\Src\Aluno;

use App\RepositorioExcecao;
use App\Src\Comum\Util;
use PDO;
use PDOException;

class AlunoRepositorioEmBDR implements AlunoRepositorio
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
         $result = $this->pdow->query('SELECT  `aluno`.*, `aluno_curso`.numero_matricula as matricula FROM `aluno` LEFT JOIN `aluno_curso` on aluno_curso.aluno_id = aluno.id')->fetchAll();
         foreach ($result as $row) {
            $objetos[] = $this->construirObjeto($row)->toArray();
         }
         return $objetos;
      } catch (\PDOException $e) {
         throw new PDOException($e->getMessage(), $e->getCode(), $e);
      }
   }

   function adicionar(Aluno &$aluno)
   {
      try {
         $erros = $aluno->validateAll([]);
         if (count($erros) > 0) throw new RepositorioExcecao(implode('|', $erros));

         $sql = "INSERT INTO " . self::TABELA . " (`nome`, `cpf`, `telefone`, `email`)
         VALUES (
         	:nome,
         	:cpf,
         	:telefone,
         	:email
         )";
         $preparedStatement = $this->pdow->prepare($sql);

         $preparedStatement->execute([
            'nome' => $aluno->getNome(),
            'cpf' => $aluno->getCpf(),
            'telefone' => $aluno->getTelefone(),
            'email' => $aluno->getEmail()
         ]);

         $aluno->setId($this->pdow->lastInsertId());
      } catch (\PDOException $e) {
         throw new PDOException($e->getMessage(), $e->getCode(), $e);
      } catch (RepositorioExcecao $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function atualizar(Aluno &$aluno)
   {
      try {

         $sql = 'UPDATE `aluno` SET
                  nome = :nome,
                  cpf = :cpf,
                  telefone = :telefone,
                  email = :email 			 	
            WHERE id = :id';
         $preparedStatement = $this->pdow->prepare($sql);

         $executou = $preparedStatement->execute([
            'nome' => $aluno->getNome(),
            'cpf' => $aluno->getCpf(),
            'telefone' => $aluno->getTelefone(),
            'email' => $aluno->getEmail(),
            'id' => $aluno->getId()
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
         $sql ='SELECT `aluno`.* , `aluno_curso`.numero_matricula as `matricula` FROM `aluno` LEFT JOIN `aluno_curso` on `aluno_curso`.aluno_id = `aluno`.id WHERE `aluno`.id = :id';
         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute(['id' => $id]);

         if ($preparedStatement->rowCount() < 1) {
            return null;
         }

         $result = $preparedStatement->fetch();

         return $this->construirObjeto($result);
      } catch (\PDOException $e) {
         Util::debug($e->getMessage());
         exit();
         throw new PDOException($e->getMessage(), $e->getCode(), $e);
      }
   }

   function delete($id)
   {
      try {
         return $this->pdoW->query('DELETE  FROM ' . self::TABELA . ' WHERE id = $id');
      } catch (\PDOException $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function contagem()
   {
      try {
         return $this->pdoW->rowCount(self::TABELA);
      } catch (\Exception $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function construirObjeto(array $row)
   {
      return new Aluno(
         $row['id'],
         $row['matricula'],
         $row['nome'],
         $row['cpf'],
         $row['telefone'],
         $row['email'],
      );
   }
}
