<?php
namespace App\Src\Aluno;

use AlunoVisao;

class AlunoController
{
    private $visao;
    private $servico;

    public function __construct()
    {
        $this->visao = new AlunoVisao();

        // $this->servico = new AlunoRepositorioEmMySQL($db);
    }

    public function listar()
    {
        printr('cheguei');
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
