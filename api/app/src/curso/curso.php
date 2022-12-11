<?php

namespace App\Src\Curso;

//require '../aluno-curso/AlunoCurso.php';

class Curso
{
    public $id;
    public $codigo;
    public $nome;
    public $situacao;
    public $dataInicio;
    public $dataFim;
    public $horaInicio;
    public $horaFim;
    // public $numeroAulas;

    public function __construct(
        $id,
        $codigo,
        $nome,
        $situacao,
        $dataInicio,
        $dataFim,
        $horaInicio,
        $horaFim,
        // $numeroAulas,
    ) {

        $this->id = $id;
        $this->codigo = $codigo;
        $this->nome = $nome;
        $this->situacao = $situacao;
        $this->dataInicio = $dataInicio;
        $this->dataFim = $dataFim;
        $this->horaInicio =  $horaInicio;
        $this->horaFim =  $horaFim;
        // $this->numeroAulas =  $numeroAulas;
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

    public function setHoraInicio($horaInicio)
    {
        $this->horaInicio = $horaInicio;
    }

    public function getHoraInicio()
    {
        return $this->horaInicio;
    }

    public function setHoraFim($horaFim)
    {
        $this->horaFim = $horaFim;
    }

    public function getHoraFim()
    {
        return $this->horaFim;
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

        if ($this->situacao != 'não iniciado' && $this->situacao != 'iniciado' && $this->situacao != 'finalizado') {
            $Erros[] = 'Situação inválida';
        }

        if ($this->dataInicio > $this->dataFim) {
            $Erros[] = 'Data de fim deve ser maior que a data de início';
        }

        if ($this->horaInicio > $this->horaFim) {
            $Erros[] = 'Hora de fim deve ser maior que a hora de início';
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
