<?php

namespace App\Src\Funcionario;

require_once 'app/src/funcionario/funcionario.php';

describe('Validar dados de um funcionário', function () {

    it('não deve retornar nenhum erro, quando todos os atributos estiverem corretos', function () {
        $funcionarioTest = new Funcionario(1, 'Vitor', '180.842.477-86', 'vitorhugo.rangel@yahoo.com.br', true, null);
        expect($funcionarioTest->validateUpdate())->toBe([]);
    });

    it('deve retornar nome inválido, quanto tiver menos de 2 caracteres', function () {
        $funcionarioTest = new Funcionario(1, 'V', '180.842.477-86', 'vitorhugo.rangel@yahoo.com.br', true, null);
        expect($funcionarioTest->validateUpdate())->toBe(["Nome inválido"]);
    });

    it('deve retornar nome inválido, quando tiver mais de 100 caracteres', function () {
        $funcionarioTest = new Funcionario(1, 'is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys stasa', '180.842.477-86', 'vitorhugo.rangel@yahoo.com.br', true, null);
        expect($funcionarioTest->validateUpdate())->toBe(["Nome inválido"]);
    });

    it('deve retornar cpf inválido', function () {
        $funcionarioTest = new Funcionario(1, 'Vitor', '180.842.477-87', 'vitorhugo.rangel@yahoo.com.br', true, null);
        expect($funcionarioTest->validateUpdate())->toBe(["CPF inválido"]);
    });

    it('deve retornar email inválido', function () {
        $funcionarioTest = new Funcionario(1, 'Vitor', '180.842.477-86', 'vitorhugo.rangel#yahoo.com.br', true, null);
        expect($funcionarioTest->validateUpdate())->toBe(["Email inválido"]);
    });
});
