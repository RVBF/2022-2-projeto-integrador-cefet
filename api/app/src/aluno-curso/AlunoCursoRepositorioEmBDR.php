<?php

namespace App\Src\AlunoCurso;

use App\Src\Aluno\Aluno;
use App\Src\Curso\Curso;
use App\RepositorioExcecao;
use App\Src\Comum\Util;
use ColecaoException;
use PDO;
use PDOException;

class AlunoCursoRepositorioEmBDR implements AlunoCursoRepositorio
{
	private $pdow = null;
	const TABELA = 'aluno_curso';
	function __construct(PDO &$pdow)
	{
		$this->pdow = $pdow;
	}

	public function todos($tamanho = 0, $salto = 0)
	{
		try {
			$objetos = [];
			$result = $this->pdow->query('SELECT * FROM aluno_curso')->fetchAll();
			foreach ($result as $row) {
				$objetos[] = $this->construirObjeto($row)->toArray();
			}
			return $objetos;
		} catch (\PDOException $e) {
			throw new PDOException($e->getMessage(), $e->getCode(), $e);
		}
	}

	function adicionar(AlunoCurso &$alunoCurso)
	{

		try {
			$sql = "INSERT INTO `pis-grupo1`.`".SELF::TABELA."` (`aluno_id`, `curso_id`, `numero_matricula`) VALUES (:aluno_id, :curso_id, :numero_matricula);
			";
			
			$dados = [
				'aluno_id' => $alunoCurso->getAluno() instanceof Aluno ? $alunoCurso->getAluno()->getId() : 0,
				'curso_id'  => $alunoCurso->getCurso() instanceof Curso ? $alunoCurso->getCurso()->getId() : 0,
				'numero_matricula' => $alunoCurso->getmatricula(),
			];

			$preparedStatement = $this->pdow->prepare($sql);
			$preparedStatement->execute($dados);

			$alunoCurso->setId($this->pdow->lastInsertId());
		} catch (\PDOException $e) {
			throw new PDOException($e->getMessage(), $e->getCode(), $e);
		}
	}

	function adicionarTodos(Array &$alunosCurso)
	{
		foreach ($alunosCurso as $key => $aluno) {
				$this->adicionar($aluno);
		}
	}

	function atualizar(AlunoCurso &$alunoCurso)
	{

		try {
			$sql = 'UPDATE  ' . self::TABELA . ' SET
				aluno_id = ":aluno_id",
				curso_id = ":curso_id",
				curso_id = ":curso_id",
				matricula = ":matricula",
				nota_av1 = ":nota_av1",
				nota_av2 = ":nota_av2",
				nota_af = ":nota_af",
				faltas = ":faltas"
			WHERE id = ":id"';
			$preparedStatement = $this->pdow->prepare($sql);

			$executou = $preparedStatement->execute([
				"aluno_id" => $alunoCurso->getAluno(),
				"curso_id" => $alunoCurso->getCurso(),
				"nota_av1" => $alunoCurso->getAv1(),
				"nota_av2" => $alunoCurso->getAv2(),
				"nota_af" => $alunoCurso->getNotaAF(),
				"faltas" => $alunoCurso->getFaltas(),
				"id" => $alunoCurso->getId()
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
			$sql = 'SELECT * FROM aluno_curso where id = "' . $id . '"';
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

	public function comAlunoId($alunoId)
	{
		try {
			$sql = 'SELECT * FROM `aluno_curso` where `aluno_curso`.aluno_id = "'.$alunoId.'"';
			$preparedStatement = $this->pdow->prepare($sql);
			$preparedStatement->execute();
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
			return $this->pdow->query('DELETE  FROM ' . self::TABELA . ' WHERE id = $id');
		} catch (\PDOException $e) {
			throw new PDOException($e->getMessage(), $e->getCode(), $e);
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
		return new AlunoCurso(
			0,
			$row['numero_matricula'],
			$row['nota_av1'],
			$row['nota_av2'],
			$row['nota_af'],
			$row['faltas'],
			$row['aluno_id'],
			$row['curso_id']
		);
	}
}
