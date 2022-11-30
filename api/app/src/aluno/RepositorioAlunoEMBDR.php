<?php

namespace App\Src\Aluno;

use ColecaoException;
use PDO;

class RepositorioAlunoEMBDR
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
         $result = $this->pdow->query('SELECT *, aluno_curso.numero_matricula as matricula FROM aluno JOIN aluno_curso on aluno_curso.aluno_id = aluno.id')->fetchAll();
         foreach ($result as $row) {
            $objetos[] = $this->construirObjeto($row)->toArray();
         }
         return $objetos;
      } catch (\PDOException $e) {
         throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
      }
   }

   function adicionar(Aluno &$aluno)
   {
      try {
         $erros = $aluno->validateAll([]);

         $sql = 'INSERT INTO ' . self::TABELA . '(matricula, nome, cpf, telefone, email)
         VALUES (
         	:matricula,
         	:nome,
         	:cpf,
         	:telefone,
         	:email,
         )';

         $this->pdoW->execute($sql, [
            'matricula' => $aluno->getMatricula(':matricula'),
            'nome' => $aluno->getNome(':nome'),
            'cpf' => $aluno->getCpf(':cpf'),
            'telefone' => $aluno->getTelefone(':telefone'),
            'email' => $aluno->getEmail(':email'),
         ]);

         $aluno->setId($this->pdoW->lastInsertId());
      } catch (\PDOException $e) {
         throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
      }
   }

   function update(Aluno &$aluno)
   {
      try {
         $sql = 'UPDATE ' . self::TABELA . ' SET
                  matricula = :matricula,
                  nome = :nome,
                  cpf = :cpf,
                  telefone = :telefone,
                  email = :email,			 	
            WHERE id = :id"';

         $this->pdoW->execute($sql, [
            'matricula' => $aluno->getMatricula(),
            'nome' => $aluno->getNome(),
            'cpf' => $aluno->getCpf(),
            'telefone' => $aluno->getTelefone(),
            'email' => $aluno->getEmail(),
            'id' => $aluno->getId()
         ]);
      } catch (\PDOException $e) {
         throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
      }
   }

   public function comId($id)
	{
		try {
			$objetos = [];
			$result = $this->pdow->query('SELECT * FROM aluno where id = "'.$id.'"')->fetchObject();

			return $this->construirObjeto($result);
		} catch (\PDOException $e) {
			throw new ColecaoException( $e->getMessage(), $e->getCode(), $e );
		}
	}

   function delete($id)
   {
      try
		{
			return $this->pdoW->query('DELETE  FROM '.self::TABELA.' WHERE id = $id');
		}catch(\PDOException $e)
		{
			throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
		}
   }

   function contagem()
   {
   	try
		{
			return $this->pdoW->rowCount(self::TABELA);
		}
		catch (\Exception $e)
		{
			throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
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
