<?php

namespace App\Src\AlunoCurso;

use App\Src\Curso\Curso;

class AlunoCurso
{
    private $id;
    private $matricula;
    private $av1;
    private $av2;
    private $notaAF;
    private $faltas;
    private $aluno;
    private $curso;

    public function __construct(
        $id,
        $matricula,
        $av1,
        $av2,
        $notaAF,
        $faltas,
        $aluno,
        $curso
    ) {

        $this->id = $id;
        $this->matricula = $matricula;
        $this->av1 = $av1;
        $this->av2 = $av2;
        $this->notaAF = $notaAF;
        $this->faltas = $faltas;
        $this->aluno = $aluno;
        $this->curso = $curso;
    }

    public function setId($id)
    {
        $this->id = $id;
    }

    public function getId()
    {
        return $this->id;
    }

    public function setAv1($av1)
    {
        $this->av1 = $av1;
    }

    public function getAv1()
    {
        return $this->av1;
    }

    public function setmatricula($matricula)
    {
        $this->$matricula = $matricula;
    }

    public function getmatricula()
    {
        return $this->matricula;
    }

    public function setAv2($av2)
    {
        $this->av2 = $av2;
    }

    public function getAv2()
    {
        return $this->av2;
    }


    public function setFalta($falta)
    {
        $this->falta = $falta;
    }

    public function getFaltas()
    {
        return $this->faltas;
    }

    public function setNotaAF($notaAF)
    {
        $this->notaAF = $notaAF;
    }

    public function getNotaAF()
    {
        return $this->notaAF;
    }

    public function setAluno($aluno)
    {
        $this->aluno = $aluno;
    }

    public function getAluno()
    {
        return $this->aluno;
    }

    public function setCurso($curso)
    {
        $this->curso = $curso;
    }

    public function getCurso()
    {
        return $this->curso;
    }

    public function calculateMediaDeAvaliacoes()
    {
        $mediaDeAvaliacoes = ($this->av1 + $this->av2) / 2;

        if ($mediaDeAvaliacoes >= 7) return 'Aprovado';
        else if ($mediaDeAvaliacoes < 3) return 'Reprovado'; {
            return 'Avaliação Final';
        }
    }

    public function calculateMediaFinal()
    {
        $mediaDeAvaliacoes = ($this->av1 + $this->av2) / 2;
        $mediaFinal = ($this->notaAF + $mediaDeAvaliacoes) / 2;

        if ($mediaFinal >= 5) {
            return 'Aprovado';
        } else return 'Reprovado';
    }
}
