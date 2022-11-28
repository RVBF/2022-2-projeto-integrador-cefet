<?php

require_once 'app/src/aluno/aluno.php';

describe('Validar dados de um aluno', function () {

    it('não deve retornar nenhum erro, quando todos os atributos estiverem corretos', function () {
        $alunoTest = new Aluno('123456', 'Vitor', '180.842.477-86', '(21) 97207-2032', 'vitorhugo.rangel@yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe([]);
    });

    it('deve retornar matrícula inválida', function () {
        $alunoTest = new Aluno('12345', 'Vitor', '180.842.477-86', '(21) 97207-2032', 'vitorhugo.rangel@yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe(["Matrícula inválida"]);
    });

    it('deve retornar nome inválido, quando tiver menos de 2 caracteres', function () {
        $alunoTest = new Aluno('123456', 'V', '180.842.477-86', '(21) 97207-2032', 'vitorhugo.rangel@yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe(["Nome inválido"]);
    });

    it('deve retornar nome inválido, quando tiver mais de 100 caracteres', function () {
        $alunoTest = new Aluno('123456', 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys stasa', '180.842.477-86', '(21) 97207-2032', 'vitorhugo.rangel@yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe(["Nome inválido"]);
    });

    it('deve retornar cpf inválido', function () {
        $alunoTest = new Aluno('123456', 'Vitor', '180.842.477-87', '(21) 97207-2032', 'vitorhugo.rangel@yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe(["CPF inválido"]);
    });

    it('deve retornar telefone inválido', function () {
        $alunoTest = new Aluno('123456', 'Vitor', '180.842.477-86', '(21) 97207-203', 'vitorhugo.rangel@yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe(["Telefone inválido"]);
    });

    it('deve retornar email inválido', function () {
        $alunoTest = new Aluno('123456', 'Vitor', '180.842.477-86', '(21) 97207-2032', 'vitorhugo.rangel#yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe(["Email inválido"]);
    });
});
