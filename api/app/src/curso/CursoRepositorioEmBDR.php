<?php

namespace App\Src\Curso;

use App\Src\Comum\Util;
use ColecaoException;
use PDO;

require_once './Curso.php';
/**
 * PHPDOC 
 * JSDOC
 */
class RepositorioCursoEMBDR implements RepositorioCurso
{
	private $pdow = null;
	const TABELA = 'aluno_curos';
	function __construct(PDO &$pdow)
	{
		$this->pdow = $pdow;
	}

	public function todos($tamanho = 0, $salto = 0)
	{
		try {
			$sql = "SELECT * FROM {self::TABELA} LIMIT $tamanho, $salto";
			return $this->pdoW->queryObjects([$this, 'construirObjeto'], $sql);
		} catch (\PDOException $e) {
			throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
		}
	}

	function adicionar(Curso &$curso)
	{

		try {
			//   $erros = $curso->validate();

			//   if(count($erros)) throw new ColecaoException("Erro ao adicionar curso!");

			$sql = 'INSERT INTO ' . self::TABELA . '(codigo, nome, situacao, inicio termino)
			VALUES (
				:codigo,
				:nome,
				:situacao,
				:inicio,
				:termino,
			)';

			$this->pdoW->execute($sql, [
				'codigo' => $curso->getCodigo(),
				'nome' => $curso->getNome(),
				'situacao' => $curso->getSituacao(),
				'inicio' => $curso->getDataInicio(),
				'termino' => $curso->getDataFim(),
			]);

			$curso->setId($this->pdoW->lastInsertId());
		} catch (\PDOException $e) {
			throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
		}
	}

	public function update(Curso &$curso)
	{
		try {
			$sql = "UPDATE {self::TABELA} SET
                  codigo = :codigo,
                  nome = :nome,
                  situacao = :situacao,
                  inicio = :inicio,
                  termino = :termino,			 	
            WHERE id = :id";

			$this->pdoW->execute($sql, [
				'codigo' => $curso->getCodigo(),
				'nome' => $curso->getNome(),
				'situacao' => $curso->getSituacao(),
				'inicio' => $curso->getDataInicio(),
				'termino' => $curso->getDataFim(),
				'id' => $curso->getId()
			]);

			return true;
		} catch (\PDOException $e) {
			throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
		}
	}
	public function comId($id)
	{
		try {
			return $this->pdoW->objectWithId([$this, 'construirObjeto'], $id, self::TABELA);
		} catch (\PDOException $e) {
			throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
		}
	}

	function construirObjeto(array $row)
	{
		return new Curso(
			$row['id'],
			$row['codigo'],
			$row['nome'],
			$row['situacao'],
			$row['dataInicio'],
			$row['dataFim'],
			$row['horaInicio'],
			$row['horaFim']
			// $numeroAulas,
		);
	}


	function delete($id)
	{
		try {
			return $this->pdoW->deleteWithId($id, self::TABELA);
		} catch (\PDOException $e) {
			throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
		}
	}

	function contagem()
	{
		try {
			return $this->pdoW->countRows(self::TABELA);
		} catch (\Exception $e) {
			throw new ColecaoException($e->getMessage(), $e->getCode(), $e);
		}
	}
}
