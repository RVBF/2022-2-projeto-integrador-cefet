<?php

class Aluno
{
    public $matricula;
    public $nome;
    public $cpf;
    public $telefone;
    public $email;

    public function __construct(
        $matricula,
        $nome,
        $cpf,
        $telefone,
        $email,
    ) {
        $this->matricula = $matricula;
        $this->nome = $nome;
        $this->cpf = $cpf;
        $this->telefone = $telefone;
        $this->email = $email;
    }


    public function validateAll($allErrors)
    {
        if (empty($this->matricula) && !is_numeric($this->matricula) && strlen($this->matricula) < 6) {
            $allErrors[] = 'Matrícula inválida';
        }

        if (empty($this->nome) && strlen($this->nome) < 2 && strlen($this->nome) > 100) {
            $allErrors[] = 'Nome inválido';
        }

        if ($this->validateCPF($this->cpf) !== 1) {
            $allErrors[] = 'CPF inválido';
        }

        if (!preg_match('/^(?:(?:\+|00)?(55)\s?)?(?:\(?([1-9][0-9])\)?\s?)?(?:((?:9\d|[2-9])\d{3})\-?(\d{4}))$/', $this->telefone)) {
            $allErrors[] = 'Telefone inválido';
        }

        if (!preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $this->email)) {
            $allErrors[] = 'Email inválido';
        }
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
        $todosErros = [];
        return $this->validateAll($todosErros);
    }

    public function validateUpdate()
    {
        $todosErros = [];
        return $this->validateAll($todosErros);
    }
}
