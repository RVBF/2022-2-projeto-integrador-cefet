<?php

class Curso
{
    public $codigo;
    public $nome;
    public $situacao;
    public $dataInicio;
    public $dataFim;
    public $horaInicio;
    public $horaFim;
    public $numeroAulas;

    public function __construct(
        $codigo,
        $nome,
        $situacao,
        $dataInicio,
        $dataFim,
        $horaInicio,
        $horaFim,
        $numeroAulas,
    ) {

        $this->codigo = $codigo;
        $this->nome = $nome;
        $this->situacao = $situacao;
        $this->dataInicio = $dataInicio;
        $this->dataFim = $dataFim;
        $this->horaInicio =  $horaInicio;
        $this->horaFim =  $horaFim;
        $this->numeroAulas =  $numeroAulas;
    }

    public function calculatePresenca($numeroAulas, $presenca)
    {
        $percentualPresenca = ($presenca / $numeroAulas) * 100;
        return $percentualPresenca;
    }

    public function validateAprovation()
    {
        $nota = new Nota(10, 6, 0, 0, 0);
        if ($this->calculatePresenca(100, 75) >= 75 && $nota->calculateMediaDeAvaliacoes(10, 6) === 'Aprovado') return 'Aprovado';
        else return 'Reprovado';
    }
}
