<?php

namespace App\Src\Curso;


class Curso
{
    private $id;
    private $codigo;
    private $nome;
    private $situacao;
    private $numeroAulas;
    private $dataInicio;
    private $dataFim;
    private $professor;

    public function __construct(
        $id,
        $codigo,
        $nome,
        $situacao,
        $numeroAulas,
        $dataInicio,
        $dataFim,
        $professor
    ) {
        $this->id = $id;
        $this->codigo = $codigo;
        $this->nome = $nome;
        $this->situacao = $situacao;
        $this->numeroAulas = $numeroAulas;
        $this->dataInicio = $dataInicio;
        $this->dataFim = $dataFim;
        $this->professor =  $professor;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setCodigo($codigo)
    {
        $this->codigo = $codigo;
    }

    public function getCodigo()
    {
        return $this->codigo;
    }

    public function setNome($nome)
    {
        $this->nome = $nome;
    }

    public function getNome()
    {
        return $this->nome;
    }

    public function setSituacao($situacao)
    {
        $this->situacao = $situacao;
    }

    public function getSituacao()
    {
        return $this->situacao;
    }

    public function setNumeroAulas($numeroAulas)
    {
        $this->numeroAulas = $numeroAulas;
    }

    public function getNumeroAulas()
    {
        return $this->numeroAulas;
    }

    public function setDataInicio($dataInicio)
    {
        $this->dataInicio = $dataInicio;
    }

    public function getDataInicio()
    {
        return $this->dataInicio;
    }

    public function setDataFim($dataFim)
    {
        $this->dataFim = $dataFim;
    }

    public function getDataFim()
    {
        return $this->dataFim;
    }

    public function setProfessor($professor)
    {
        $this->professor = $professor;
    }

    public function getProfessor()
    {
        return $this->professor;
    }
    

    public function calculatePresenca($numeroAulas, $presenca)
    {
        $percentualPresenca = ($presenca / $numeroAulas) * 100;
        return $percentualPresenca;
    }

    public function validate()
    {
        $Erros = [];

        if (!preg_match('/^[a-zA-Z]{3}[0-9]{2}$/', $this->codigo)) {
            $Erros[] = 'Código inválido';
        }

        if (empty($this->nome) || strlen($this->nome) < 2 || strlen($this->nome) > 100) {
            $Erros[] = 'Nome inválido';
        }

        if ($this->situacao != 'Não iniciado' && $this->situacao != 'Iniciado' && $this->situacao != 'Finalizado') {
            $Erros[] = 'Situação inválida';
        }

        if ($this->dataInicio > $this->dataFim) {
            $Erros[] = 'Data de fim deve ser maior que a data de início';
        }

        return $Erros;
    }

    public function validateAprovation()
    {
        // $nota = new Nota(10, 6, 0, 0, 0);
        // if ($this->calculatePresenca(100, 75) >= 75 && $nota->calculateMediaDeAvaliacoes(10, 6) === 'Aprovado') return 'Aprovado';
        // else return 'Reprovado';
    }
}
