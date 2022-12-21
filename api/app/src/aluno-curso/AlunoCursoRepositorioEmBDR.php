<?php

namespace App\Src\AlunoCurso;

use App\Src\Aluno\Aluno;
use App\Src\Comum\Debuger;
use App\Src\Curso\Curso;
use App\Src\Execao\RepositorioExcecao;
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
			$sql = 'SELECT ac.id id, ac.aluno_id aluno_id, ac.numero_matricula numero_matricula, c.numero_aulas numero_aulas,  ac.nota_av1 nota_av1, ac.nota_av2 nota_av2, ac.nota_af nota_af, ac.faltas faltas, a.nome nome, a.matricula matricula, c.id curso_id, c.nome curso_nome, c.codigo as codigo_curso FROM aluno_curso ac INNER JOIN aluno a ON a.id = ac.aluno_id INNER JOIN curso c ON c.id = ac.curso_id';
			$objetos = [];
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

	public function todosComProfessorId($professorId)
	{
		try {
			$objetos = [];
			$sql = 'SELECT ac.id id, ac.aluno_id aluno_id, ac.numero_matricula numero_matricula, c.numero_aulas numero_aulas,  ac.nota_av1 nota_av1, ac.nota_av2 nota_av2, ac.nota_af nota_af, ac.faltas faltas, a.nome nome, a.matricula matricula, c.id curso_id, c.nome curso_nome, c.codigo as codigo_curso FROM aluno_curso ac INNER JOIN aluno a ON a.id = ac.aluno_id INNER JOIN curso c ON c.id = ac.curso_id INNER JOIN funcionario as f ON f.id = c.professor_id AND f.id = "'.$professorId .'"';
			$objetos = [];
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

	function adicionar(AlunoCurso &$alunoCurso)
	{

		try {
			$sql = "INSERT INTO `pis-grupo1`.`" . SELF::TABELA . "` (`aluno_id`, `curso_id`, `numero_matricula`) VALUES (:aluno_id, :curso_id, :numero_matricula);
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

	function adicionarTodos(array &$alunosCurso)
	{
		foreach ($alunosCurso as $key => $aluno) {
			$this->adicionar($aluno);
		}
	}

	function atualizar(AlunoCurso &$alunoCurso)
	{
		try {
			$sql = 'UPDATE  ' . self::TABELA . ' SET
				aluno_id = :aluno_id,
				curso_id = :curso_id,
				numero_matricula = :matricula,
				nota_av1 = :nota_av1,
				nota_av2 = :nota_av2,
				nota_af = :nota_af,
				faltas = :faltas
			WHERE id = :id';
			$preparedStatement = $this->pdow->prepare($sql);

			$executou = $preparedStatement->execute([
				"aluno_id" => $alunoCurso->getAluno()["id"],
				"curso_id" => $alunoCurso->getCurso()["id"],
				"matricula" => $alunoCurso->getmatricula(),
				"nota_av1" => $alunoCurso->getAv1() !== null ? $alunoCurso->getAv1() : null,
				"nota_av2" => $alunoCurso->getAv2() !== null ? $alunoCurso->getAv2() : null,
				"nota_af" => $alunoCurso->getNotaAF() !== null ? $alunoCurso->getNotaAF() : null,
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
			$sql = 'SELECT ac.id id, ac.aluno_id aluno_id, ac.numero_matricula numero_matricula, c.numero_aulas numero_aulas, ac.nota_av1 nota_av1, ac.nota_av2 nota_av2, ac.nota_af nota_af, ac.faltas faltas, c.numero_aulas numero_aulas, a.nome nome, a.matricula matricula, c.id curso_id, c.nome curso_nome, c.codigo as codigo_curso FROM aluno_curso ac INNER JOIN aluno a ON a.id = ac.aluno_id INNER JOIN curso c ON c.id = ac.curso_id where ac.id = "' . $id . '"';
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
			$sql = 'SELECT ac.id id, ac.aluno_id aluno_id, ac.numero_matricula numero_matricula, c.numero_aulas numero_aulas, ac.nota_av1 nota_av1, ac.nota_av2 nota_av2, ac.nota_af nota_af, ac.faltas faltas, c.numero_aulas numero_aulas, a.nome nome, a.matricula matricula, c.id curso_id, c.nome curso_nome, c.codigo as codigo_curso, c.codigo as codigo_curso FROM aluno_curso ac INNER JOIN aluno a ON a.id = ac.aluno_id INNER JOIN curso c ON c.id = ac.curso_id where ac.aluno_id = "' . $alunoId . '"';
			$preparedStatement = $this->pdow->prepare($sql);

			$preparedStatement->execute();
			if ($preparedStatement->rowCount() < 1) {
				return [];
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

	public function comCursoId($cursoId)
	{
		try {
			$sql = 'SELECT ac.id id, ac.aluno_id aluno_id, ac.numero_matricula numero_matricula, c.numero_aulas numero_aulas, ac.nota_av1 nota_av1, ac.nota_av2 nota_av2, ac.nota_af nota_af, ac.faltas faltas, c.numero_aulas numero_aulas, a.nome nome, a.matricula matricula, c.id curso_id, c.nome curso_nome, c.codigo as codigo_curso, c.codigo as codigo_curso FROM aluno_curso ac INNER JOIN aluno a ON a.id = ac.aluno_id INNER JOIN curso c ON c.id = ac.curso_id where ac.curso_id = "' . $cursoId . '"';
			$preparedStatement = $this->pdow->prepare($sql);

			$preparedStatement->execute();
			if ($preparedStatement->rowCount() < 1) {
				return [];
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

	function deleteComCursoEAluno($cursoId, $alunoId)
	{
		try {
			$sql = 'DELETE  FROM ' . self::TABELA . ' WHERE curso_id = :curso_id and aluno_id = :aluno_id';
			$preparedStatement = $this->pdow->prepare($sql);
			$preparedStatement->execute(['curso_id' => $cursoId, 'aluno_id' => $alunoId]);
		} catch (\PDOException $e) {
			throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
		}
	}

	function deleteComIdAluno($alunoId)
	{
		try {
			$sql = 'DELETE  FROM ' . self::TABELA . ' WHERE aluno_id = :aluno_id';
			$preparedStatement = $this->pdow->prepare($sql);
			$preparedStatement->execute(['aluno_id' => $alunoId]);
		} catch (\PDOException $e) {
			throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
		}
	}

	function contagem()
	{
		try {
			$sql = 'SELECT COUNT(*) FROM `' . SELF::TABELA . '`';
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
			$row["id"],
			$row['numero_matricula'],
			$row['nota_av1'],
			$row['nota_av2'],
			$row['nota_af'],
			$row['faltas'],
			new Aluno($row['aluno_id'], $row['numero_matricula'], $row['nome'], null, null, '', null),
			new Curso($row['curso_id'], $row['codigo_curso'], $row['curso_nome'], '', $row['numero_aulas'], '', '', '')
		);
	}
}
