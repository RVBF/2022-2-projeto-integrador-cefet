<?php

namespace App\Src\Curso;

use App\RepositorioExcecao;
use App\Src\Comum\Util;
use PDO;
use PDOException;

require_once './Curso.php';

class CursoRepositorioEMBDR implements RepositorioCurso
{
	private $pdow = null;
	const TABELA = 'curso';
	function __construct(PDO &$pdow)
	{
		$this->pdow = $pdow;
	}

	public function todos($tamanho = 0, $salto = 0)
	{
		try {
			$objetos = [];
			$result = $this->pdow->query('SELECT * FROM `curso`')->fetchAll();
			foreach ($result as $row) {
				$objetos[] = $this->construirObjeto($row)->toArray();
			}
			return $objetos;
		} catch (\PDOException $e) {
			throw new PDOException($e->getMessage(), $e->getCode(), $e);
		}
	}

	function adicionar(Curso &$curso)
	{

		try {
			$erros = $curso->validate();
			if (count($erros)) throw new RepositorioExcecao(implode('|', $erros));

			$sql = "INSERT INTO " . self::TABELA . " (`codigo`, `nome`, `situacao`, `dataInicio`, `dataFim`, `horaInicio`, `horaFim`)
			VALUES (
				:codigo,
				:nome,
				:situacao,
				:dataInicio,
				:dataFim,
				:horaInicio,
				:horaFim
			)";

			$preparedStatement = $this->pdow->prepare($sql);

			$preparedStatement->execute([
				'codigo' => $curso->getCodigo(),
				'nome' => $curso->getNome(),
				'situacao' => $curso->getSituacao(),
				'dataInicio' => $curso->getDataInicio(),
				'dataFim' => $curso->getDataFim(),
				'horaInicio' => $curso->getHoraInicio(),
				'horaFim' => $curso->getHoraFim()
			]);

			$curso->setId($this->pdoW->lastInsertId());
		} catch (\PDOException $e) {
			throw new PDOException($e->getMessage(), $e->getCode(), $e);
		} catch (RepositorioExcecao $e) {
			throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
		}
	}

	function atualizar(Curso &$curso)
	{
		try {

			$sql = 'UPDATE `curso` SET
				codigo = :codigo,
                nome = :nome,
                situacao = :situacao,
                dataInicio = :dataInicio,
				dataFim = :dataFim,
				horaInicio = :horaInicio,
                email = :email 			 	
            WHERE id = :id';
			$preparedStatement = $this->pdow->prepare($sql);

			$executou = $preparedStatement->execute([
				'codigo' => $curso->getNome(),
				'nome' => $curso->getNome(),
				'situacao' => $curso->getSituacao(),
				'dataInicio' => $curso->getDataInicio(),
				'dataFim' => $curso->getDataFim(),
				'horaInicio' => $curso->getHoraInicio(),
				'horaFim' => $curso->getHoraFim()
			]);
			Util::debug($executou);
		} catch (\PDOException $e) {
			throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
		} catch (RepositorioExcecao $e) {
			throw new RepositorioExcecao($e->getMessage(), $e->getCode(), $e);
		}
	}

	public function comId($id)
	{
		try {
			$sql = 'SELECT * FROM curso WHERE id = $id';
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
		return new Curso(
			$row['id'],
			$row['codigo'],
			$row['nome'],
			$row['situacao'],
			$row['dataInicio'],
			$row['dataFim'],
			$row['horaInicio'],
			$row['dataFim'],
		);
	}
}
