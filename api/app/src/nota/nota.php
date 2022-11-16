<?php
class Nota
{
    public $av1;
    public $av2;
    public $mediaDeAvaliacoes;
    public $avaliacaoFinal;
    public $mediaFinal;

    public function __construct(
        $av1,
        $av2,
        $mediaDeAvaliacoes,
        $avaliacaoFinal,
        $mediaFinal,
    ) {

        $this->av1 = $av1;
        $this->av2 = $av2;
        $this->mediaDeAvaliacoes = $mediaDeAvaliacoes;
        $this->avaliacaoFinal = $avaliacaoFinal;
        $this->mediaFinal =  $mediaFinal;
    }

    public function calculateMediaDeAvaliacoes($av1, $av2, $af)
    {
        $this->mediaDeAvaliacoes = ($av1 + $av2) / 2;
        $this->mediaFinal = $af + $this->mediaDeAvaliacoes;

        if ($this->mediaDeAvaliacoes >= 7 || $this->mediaFinal >= 5) {
            return 'Aprovado';
        } else if ($this->mediaDeAvaliacoes < 3 || $this->mediaFinal < 5) {
            return 'Reprovado';
        } else {
            return 'Avaliação Final';
        }
    }
}
