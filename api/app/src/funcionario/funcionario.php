<?php
namespace App\Src\Funcionario;

class Funcionario
{
    private $id;
    private $nome;
    private $cpf;
    private $email;
    private $eAdministrador;
    private $senha;

    public function __construct(
        $id,
        $nome,
        $cpf,
        $email,
        $eAdministrador
    ) {
        $this->id = $id;
        $this->nome = $nome;
        $this->cpf = $cpf;
        $this->email = $email;
        $this->eAdministrador = $eAdministrador;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getId(){
        return $this->id;
    }

    public function setNome($nome) {
        $this->nome = $nome;
    }

    public function getNome(){
        return $this->nome;
    }

    public function setCPF($cpf) {
        $this->cpf = $cpf;
    }

    public function getCPF(){
        return $this->cpf;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function getEmail(){
        return $this->email;
    }

    public function getEAdministrador(){
        return $this->eAdministrador;
    }

    public function setEAdministrador($eAdministrador) {
        $this->eAdministrador = $eAdministrador;
    }
 
    public function getSenha(){
        return $this->senha;
    }

    public function setSenha($senha) {
        $this->senha = $senha;
    }

    public function validateAll($allErrors)
    {

        if (empty($this->nome) || strlen($this->nome) < 2 || strlen($this->nome) > 100) {
            $allErrors[] = 'Nome inválido';
        }

        if ($this->validateCPF($this->cpf) != 1) {
            $allErrors[] = 'CPF inválido';
        }

        if (!preg_match('/^[^0-9][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[@][a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,4}$/', $this->email)) {
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

    public function toArray()
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'cpf' => $this->cpf,
            'email' => $this->email,
            'eAdministrador' => $this->eAdministrador,
        ];
    }
}
