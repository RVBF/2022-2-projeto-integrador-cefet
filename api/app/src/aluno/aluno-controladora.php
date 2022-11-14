<?php

require './aluno.php';
require './aluno-repositorio-mysql.php';
require './aluno-visao.php';
require_once '../pdo/conexao.php';

class AlunoControladora
{
    private $visao;
    private $servico;

    public function __construct()
    {
        $this->visao = new AlunoVisao();

        $pdo = new Conexao();
        $pdoConn = $pdo->getConnection();
        $this->servico = new AlunoRepositorioEmMySQL($pdoConn);
    }

    public function init()
    {
    }

    function insertStudent()
    {
    }

    function updateStudent()
    {
    }

    function deleteStudent()
    {
    }

    function getStudent()
    {
    }

    function allStudent()
    {
    }
}
