<?php

namespace App\Src\Aluno;

use App\Src\AlunoCurso\AlunoCurso;
use App\Src\Curso\Curso;

class Aluno
{
    private $id;
    private $matricula;
    private $nome;
    private $cpf;
    private $telefone;
    private $email;
    private $cursos;

    public function __construct(
        $id,
        $matricula,
        $nome,
        $cpf,
        $telefone,
        $email,
        $cursos = null
    ) {
        $this->id = $id;
        $this->matricula = $matricula;
        $this->nome = $nome;
        $this->cpf = $cpf;
        $this->telefone = $telefone;
        $this->email = $email;
        $this->cursos = $cursos;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getId()
    {
        return $this->id;
    }
    public function setMatricula($matricula)
    {
        $this->matricula = $matricula;
    }

    public function getMatricula()
    {
        return $this->matricula;
    }

    public function setNome($nome)
    {
        $this->nome = $nome;
    }

    public function getNome()
    {
        return $this->nome;
    }

    public function setCpf($cpf)
    {
        $this->cpf = $cpf;
    }

    public function getCpf()
    {
        return $this->cpf;
    }

    public function setTelefone($telefone)
    {
        $this->telefone = $telefone;
    }

    public function getTelefone()
    {
        return $this->telefone;
    }

    public function setEmail($email)
    {
        $this->email = $email;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function setCursos($cursos)
    {
        $this->cursos = $cursos;
    }

    public function getCursos()
    {
        return $this->cursos;
    }

    public function validateAll($allErrors)
    {
        if (empty($this->matricula) || !is_numeric($this->matricula) || strlen($this->matricula) < 6) {
            $allErrors[] = 'Matrícula inválida';
        }

        if (empty($this->nome) || strlen($this->nome) < 2 || strlen($this->nome) > 100) {
            $allErrors[] = 'Nome inválido';
        }

        if ($this->validateCPF($this->cpf) != 1) {
            $allErrors[] = 'CPF inválido';
        }

        if (!preg_match('/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/', $this->telefone)) {
            $allErrors[] = 'Telefone inválido';
        }

        if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
            $allErrors[] = 'Email inválido';
        }

        return $allErrors;
    }

    public function validateCPF($cpf)
    {
        // Extrai somente os números
        $cpf = preg_replace('/[^0-9]/is', '', $cpf);

        // Verifica se foi informado todos os digitos corretamente
        if (strlen($cpf) != 11) {
            return false;
        }

        // Verifica se foi informada uma sequência de digitos repetidos. Ex: 111.111.111-11
        if (preg_match('/(\d)\1{10}/', $cpf)) {
            return false;
        }

        // Faz o calculo para validar o CPF
        for ($t = 9; $t < 11; $t++) {
            for ($d = 0, $c = 0; $c < $t; $c++) {
                $d += $cpf[$c] * (($t + 1) - $c);
            }
            $d = ((10 * $d) % 11) % 10;
            if ($cpf[$c] != $d) {
                return false;
            }
        }
        return true;
    }

    public function validateInsert()
    {
        $allErrors = [];
        return $this->validateAll($allErrors);
    }

    public function validateUpdate()
    {
        $allErrors = [];
        return $this->validateAll($allErrors);
    }
}
