<?php

require_once 'app/src/funcionario/funcionario.php';

describe('Validar dados de um funcionário', function () {

    it('não deve retornar nenhum erro, quando todos os atributos estiverem corretos', function () {
        $alunoTest = new Funcionario('Vitor', '180.842.477-86', 'vitorhugo.rangel@yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe([]);
    });

    it('deve retornar nome inválido, quanto tiver menos de 2 caracteres', function () {
        $alunoTest = new Funcionario('V', '180.842.477-86', 'vitorhugo.rangel@yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe(["Nome inválido"]);
    });

    it('deve retornar nome inválido, quando tiver mais de 100 caracteres', function () {
        $alunoTest = new Funcionario('is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys stasa', '180.842.477-86', 'vitorhugo.rangel@yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe(["Nome inválido"]);
    });

    it('deve retornar cpf inválido', function () {
        $alunoTest = new Funcionario('Vitor', '180.842.477-87', 'vitorhugo.rangel@yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe(["CPF inválido"]);
    });

    it('deve retornar email inválido', function () {
        $alunoTest = new Funcionario('Vitor', '180.842.477-86', 'vitorhugo.rangel#yahoo.com.br');
        expect($alunoTest->validateUpdate())->toBe(["Email inválido"]);
    });
});
