<?php

namespace App\Src\AlunoCurso;

use ColecaoException;
use PDO;

class RepositorioAlunoCursoEMBDR implements RepositorioAlunoCurso
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
			throw new ColecaoException( $e->getMessage(), $e->getCode(), $e );
		}
	}

	function adicionar(AlunoCurso &$alunoCurso)
	{

		try {
			$sql = 'INSERT INTO ' . self::TABELA . '(aluno_id, curso_id, matricula, nota_av1, nota_av2, nota_af, faltas)
		
			VALUES (
				:aluno_id,
				:curso_id,
				:curso_id,
				:matricula,
				:nota_av1,
				:nota_av2,
				:nota_af,
				:faltas
			)';

			$this->pdoW->execute($sql, [
				"aluno_id" => $alunoCurso->getAluno(),
				"curso_id" => $alunoCurso->getCurso(),
				"nota_av1" => $alunoCurso->getAv1(),
				"nota_av2" => $alunoCurso->getAv2(),
				"nota_af" => $alunoCurso->getNotaAF(),
				"faltas" => $alunoCurso->getFaltas()
			]);

			$alunoCurso->setId($this->pdoW->lastInsertId());
		} catch (\PDOException $e) {
			throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
		}
	}

	function update(AlunoCurso &$alunoCurso)
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

			$this->pdoW->execute($sql, [
				"aluno_id" => $alunoCurso->getAluno(),
				"curso_id" => $alunoCurso->getCurso(),
				"nota_av1" => $alunoCurso->getAv1(),
				"nota_av2" => $alunoCurso->getAv2(),
				"nota_af" => $alunoCurso->getNotaAF(),
				"faltas" => $alunoCurso->getFaltas(),
				"id" => $alunoCurso->getId()
			]);
		} catch (\PDOException $e) {
			throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
		}
	}

	public function comId($id)
	{
		try {
			$objetos = [];
			$result = $this->pdow->query('SELECT * FROM aluno_curso where id = "'.$id.'"')->fetchObject();

			return $this->construirObjeto($result);
		} catch (\PDOException $e) {
			throw new ColecaoException( $e->getMessage(), $e->getCode(), $e );
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
}
