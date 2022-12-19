<?php

use App\Src\Curso\Curso;

require_once 'app/src/curso/Curso.php';

describe('Validar atributos de Curso', function () {

    it('Não deve retornar erros quando todos os atributos estiverem corretos', function () {
        $curso = new Curso(
            1,
            'PHP01',
            'Curso de PHP',
            'Não iniciado',
            10,
            '2022-01-01',
            '2022-12-31',
            null
        );
        expect($curso->validate())->toBe([]);
    });

    it('Deve retornar código inválido', function () {
        $curso = new Curso(
            1,
            'PHP1',
            'Curso de PHP',
            'Não iniciado',
            10,
            '2022-01-01',
            '2022-12-31',
            null
        );
        expect($curso->validate())->toBe(['Código inválido']);
    });

    it('Deve retornar nome inválido caso o mesmo possua menos de 2 caracteres', function () {
        $curso = new Curso(
            1,
            'PHP01',
            'P',
            'Não iniciado',
            10,
            '2022-01-01',
            '2022-12-31',
            null
        );
        expect($curso->validate())->toBe(['Nome inválido']);
    });

    it('Deve retornar nome inválido caso o mesmo possua mais de 100 caracteres', function () {
        $curso = new Curso(
            1,
            'PHP01',
            'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys stasa',
            'Não iniciado',
            10,
            '2022-01-01',
            '2022-12-31',
            null
        );
        expect($curso->validate())->toBe(['Nome inválido']);
    });

    it('Deve retornar situação inválida caso tenha valores foram dos definidos', function () {
        $curso = new Curso(
            1,
            'PHP01',
            'Curso de PHP',
            'Terminado',
            10,
            '2022-01-01',
            '2022-12-31',
            null
        );
        expect($curso->validate())->toBe(['Situação inválida']);
    });

    it('Deve retornar erro caso data de início seja maior que a data de fim', function () {
        $curso = new Curso(
            1,
            'PHP01',
            'Curso de PHP',
            'Não iniciado',
            10,
            '2023-01-01',
            '2022-12-31',
            null
        );
        expect($curso->validate())->toBe(['Data de fim deve ser maior que a data de início']);
    });

    it('Deve retornar erro caso a hora de início seja maior que a data de fim', function () {
        $curso = new Curso(
            1,
            'PHP01',
            'Curso de PHP',
            'Não iniciado',
            10,
            '2023-01-01',
            '2022-12-31',
            null
        );
        expect($curso->validate())->toBe(['Data de fim deve ser maior que a data de início']);
    });
});
