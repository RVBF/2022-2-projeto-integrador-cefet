<?php
namespace App\Src\AlunoCurso;

class AlunoCurso
{
    private $id;
    private $numeroMatricula;
    private $av1;
    private $av2;
    private $avaliacaoFinal;
    private $faltas;
    private $aluno;
    private $curso;

    public function __construct(
        $id,
        $numeroMatricula,
        $av1,
        $av2,
        $avaliacaoFinal,
        $faltas,
        $aluno,
        $curso
    ) {

        $this->id = $id;
        $this->numeroMatricula = $numeroMatricula;
        $this->av1 = $av1;
        $this->av2 = $av2;
        $this->avaliacaoFinal = $avaliacaoFinal;
        $this->faltas = $faltas;
        $this->aluno = $aluno;
        $this->curso = $curso;    
    }

    public function setId($id){
        $this->id = $id;
    }

    public function getId(){
        return $this->id;
    }

    public function setAv1($av1){
        $this->av1 = $av1;
    }

    public function getAv1(){
        return $this->av1;
    }
 
    public function setNumeroMatricula($numeroMatricula){
        $this->$numeroMatricula = $numeroMatricula;
    }

    public function getNumeroMatricula(){
        return $this->numeroMatricula;
    }
    
    public function setAv2($av2){
        $this->av2 = $av2;
    }

    public function getAv2(){
        return $this->av2;
    }
    
    public function setAvalicaoFinal($avaliacaoFinal){
        $this->avaliacaoFinal = $avaliacaoFinal;
    }

    public function getAvalicaoFinal(){
        return $this->avaliacaoFinal;
    }

    public function setFalta($falta){
        $this->falta = $falta;
    }

    public function getFaltas(){
        return $this->faltas;
    }

    public function setAvaliacaoFinal($avaliacaoFinal){
        $this->avaliacaoFinal = $avaliacaoFinal;
    }

    public function getAvaliacaoFinal(){
        return $this->avaliacaoFinal;
    }

    public function setAluno($aluno){
        $this->aluno = $aluno;
    }

    public function getAluno(){
        return $this->aluno;
    }

    public function setCurso($curso){
        $this->curso = $curso;
    }

    public function getCurso(){
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
        $mediaDeAvaliacoes = $this->calculateMediaDeAvaliacoes();
        $mediaFinal = ($this->avaliacaoFinal + $mediaDeAvaliacoes) / 2;

        if ($mediaFinal >= 5) {
            return 'Aprovado';
        } else return 'Reprovado';
    }

    public function toArray(){
        return [ 
            'id' => $this->id,
            'numeroMatricula' => $this->numeroMatricula,
            'av1' => $this->av1,
            'av2' => $this->av2,
            'avaliacaoFinal' => $this->avaliacaoFinal,
            'faltas' => $this->faltas,
            'aluno' => $this->aluno,
            'curso' => $this->curso,    
        ];
    }
}
