<?php

namespace App\Src\Curso;

use App\RepositorioExcecao;
use App\Src\Comum\Util;
use App\Src\Curso\CursoRepositorio;
use App\Src\Funcionario\Funcionario;
use DateTime;
use PDO;
use PDOException;


class CursoRepositorioEMBDR implements CursoRepositorio
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

			$sql = 'SELECT * FROM `curso`';
			$preparedStatement = $this->pdow->prepare($sql);
			$preparedStatement->execute();
			$result = $preparedStatement->fetchAll(PDO::FETCH_ASSOC);

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

			$sql = "INSERT INTO " . self::TABELA . " (`codigo`, `nome`, `situacao`, `inicio`, `termino`)
			VALUES (
				:codigo,
				:nome,
				:situacao,
				:inicio,
				:fim
			)";

			$preparedStatement = $this->pdow->prepare($sql);

			
			$preparedStatement->execute([
				'codigo' => $curso->getCodigo(),
				'nome' => $curso->getNome(),
				'situacao' => $curso->getSituacao(),
				'inicio' =>  str_replace('Z','',str_replace('T', ' ', $curso->getDataInicio())),
				'fim' => str_replace('Z','',str_replace('T', ' ', $curso->getDataFim()))
				// 'professor_id' => ($curso->getProfessor() instanceof Funcionario) ? $curso->getProfessor()->getid() : 0
			]);

			$curso->setId($this->pdow->lastInsertId());
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
				inicio = :inicio,
				termino = :fim,
				professor_id = :professor_id
            WHERE id = :id';
			$preparedStatement = $this->pdow->prepare($sql);

			$executou = $preparedStatement->execute([
				'codigo' => $curso->getCodigo(),
				'nome' => $curso->getNome(),
				'situacao' => $curso->getSituacao(),
				'inicio' => $curso->getDataInicio(),
				'fim' => $curso->getDataFim(),
				'professor_id' => ($curso->getProfessor() instanceof Funcionario) ? $curso->getProfessor()->getid() : 0,
				'id' => $curso->getId()
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
			$sql = 'SELECT * FROM curso WHERE id = $id';
			$preparedStatement = $this->pdow->prepare($sql);
			$preparedStatement->execute(['id' => $id]);

			if ($preparedStatement->rowCount() < 1) {
				return null;
			}

			$result = $preparedStatement->fetch();

			return $this->construirObjeto($result);
		} catch (\PDOException $e) {
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
			$row['inicio'],
			$row['termino'],
			new Funcionario($row['professor_id'], '', '','', false),
		);
	}
}
