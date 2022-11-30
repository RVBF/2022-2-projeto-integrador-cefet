<?php

use App\Src\AlunoCurso\AlunoCurso;

require_once 'app/src/aluno-curso/AlunoCurso.php';

describe('Validar cálculo de notas', function () {

    it('Deve retornar {Aprovado} quando média de avalições maior ou igual a 7', function () {
        $nota = new AlunoCurso(
            1,
            123456,
            7,
            7,
            0,
            1,
            null,
            null
        );
        expect($nota->calculateMediaDeAvaliacoes())->toBe('Aprovado');
    });

    it('Deve retornar {Avaliação Final} quando média de avalições for entre 3 e 6.9', function () {
        $nota = new AlunoCurso(
            1,
            123456,
            7,
            6.9,
            0,
            1,
            null,
            null
        );
        expect($nota->calculateMediaDeAvaliacoes())->toBe('Avaliação Final');
    });

    it('Deve retornar {Reprovado} quando média de avalições for menor que 3', function () {
        $nota = new AlunoCurso(
            1,
            123456,
            3,
            2.9,
            0,
            1,
            null,
            null
        );
        expect($nota->calculateMediaDeAvaliacoes())->toBe('Reprovado');
    });

    it('Deve retornar {Aprovado} quando média final for maior ou igual a 5', function () {
        $nota = new AlunoCurso(
            1,
            123456,
            3,
            3,
            7,
            1,
            null,
            null
        );
        expect($nota->calculateMediaFinal())->toBe('Aprovado');
    });

    it('Deve retornar {Reprovado} quando média final for menor que 5', function () {
        $nota = new AlunoCurso(
            1,
            123456,
            6,
            6,
            3,
            1,
            null,
            null
        );
        expect($nota->calculateMediaFinal())->toBe('Reprovado');
    });
});
