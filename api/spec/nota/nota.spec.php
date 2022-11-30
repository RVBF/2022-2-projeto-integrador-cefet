<?php

require_once 'app/src/nota/nota.php';

describe('Validar calculo de notas', function () {

    it('Deve retornar {Aprovado} quando média de avalições maior ou igual a 7', function () {
        $notasTest = new Nota(
            '$av1',
            '$av2',
            '$mediaDeAvaliacoes',
            '$notaAF',
            '$mediaFinal',
        );
        expect($notasTest->calculateMediaDeAvaliacoes(7, 7))->toBe('Aprovado');
    });

    it('Deve retornar {Avaliação Final} quando média de avalições for entre 3 e 6.9', function () {
        $notasTest = new Nota(
            '$av1',
            '$av2',
            '$mediaDeAvaliacoes',
            '$notaAF',
            '$mediaFinal',
        );
        expect($notasTest->calculateMediaDeAvaliacoes(6.9, 6.9))->toBe('Avaliação Final');
    });

    it('Deve retornar {Reprovado} quando média de avalições for menor que 3', function () {
        $notasTest = new Nota(
            '$av1',
            '$av2',
            '$mediaDeAvaliacoes',
            '$notaAF',
            '$mediaFinal',
        );
        expect($notasTest->calculateMediaDeAvaliacoes(3, 2.9))->toBe('Reprovado');
    });

    it('Deve retornar {Aprovado} quando média final for maior ou igual a 5', function () {
        $notasTest = new Nota(
            '$av1',
            '$av2',
            '$mediaDeAvaliacoes',
            '$notaAF',
            '$mediaFinal',
        );
        expect($notasTest->calculateMediaFinal(6, 6, 4))->toBe('Aprovado');
    });

    it('Deve retornar {Reprovado} quando média final for menor que 5', function () {
        $notasTest = new Nota(
            '$av1',
            '$av2',
            '$mediaDeAvaliacoes',
            '$notaAF',
            '$mediaFinal',
        );
        expect($notasTest->calculateMediaFinal(6, 6, 3.99))->toBe('Reprovado');
    });
});
