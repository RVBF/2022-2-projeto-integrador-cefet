<?php

namespace App\Src\Aluno;

use App\Src\AlunoCurso\AlunoCurso;
use App\Src\Comum\Debuger;
use App\Src\Curso\Curso;
use App\Src\Execao\RepositorioExcecao;
use App\Src\Servico\ServicoVisao;
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
         $sql = 'SELECT  `aluno`.* FROM `aluno`';
         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute();
         $result = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);
         foreach ($result as $row) {
            $objetos[] = $this->construirObjeto($row);
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

         $sql = "INSERT INTO " . self::TABELA . " (`matricula`, `nome`, `cpf`, `telefone`, `email`)
         VALUES (
         	:matricula,
         	:nome,
         	:cpf,
         	:telefone,
         	:email
         )";
         $preparedStatement = $this->pdow->prepare($sql);

         $preparedStatement->execute([
            'matricula' => $aluno->getMatricula(),
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
      } catch (\PDOException $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      } catch (RepositorioExcecao $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   public function comId($id)
   {
      try {
         $sql = 'SELECT `aluno`.* FROM `aluno`  WHERE `aluno`.id = :id';
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

   public function comCursoId($id)
   {
      try {
         $objetos = [];
         $sql = 'SELECT `aluno`.*, aluno.id as a_id, ac.id id_aluno_curso, c.numero_aulas numero_aulas,  ac.nota_av1 nota_av1, ac.nota_av2 nota_av2, ac.nota_af nota_af, ac.faltas faltas, c.id curso_id, c.nome curso_nome, c.codigo as codigo_curso FROM `aluno` LEFT JOIN aluno_curso as ac on ac.aluno_id = aluno.id LEFT JOIN curso as c on ac.curso_id = c.id  WHERE c.id = :id';


         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute(['id' => $id]);

         if ($preparedStatement->rowCount() < 1) {
            return null;
         }

         $result = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);
         foreach ($result as $row) {
            $objetos[] = $this->construirObjeto($row);
         }
         return $objetos;
      } catch (\PDOException $e) {

         throw new PDOException($e->getMessage(), $e->getCode(), $e);
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
         $sql = 'SELECT COUNT(*) as quantidade FROM `' . SELF::TABELA . '`';
         $preparedStatement = $this->pdow->prepare($sql);
         $preparedStatement->execute();
         if ($preparedStatement->rowCount() < 1) {
            return null;
         }

         $result = $preparedStatement->fetch(PDO::FETCH_ASSOC);
         return $result['quantidade'];
      } catch (\Exception $e) {
         throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
      }
   }

   function construirObjeto(array $row)
   {
      return new Aluno(
         (isset($row['a_id'])) ? $row['a_id'] : $row['id'],
         $row['matricula'],
         $row['nome'],
         $row['cpf'],
         $row['telefone'],
         $row['email'],
         (isset($row['id_aluno_curso'])) ?
            new AlunoCurso(
               $row["id"],
               $row['matricula'],
               $row['nota_av1'],
               $row['nota_av2'],
               $row['nota_af'],
               $row['faltas'],
               null,
               new Curso($row['curso_id'], $row['codigo_curso'], $row['curso_nome'], '', $row['numero_aulas'], '', '', '')
            ) :  null
      );
   }
}
