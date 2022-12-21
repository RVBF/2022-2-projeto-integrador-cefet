<?php

use App\Src\Login\Login;

require 'vendor/autoload.php';
require_once 'app/src/login/login.php';

describe('Login', function () {

    it('Deve validar login', function () {
        $loginTest = new Login('teste_login', 'teste_senha');
        expect($loginTest->validar())->toBe([]);
    });

    it('Não deve validar login quando nome do usuário não estiver definido', function () {
        $loginTest = new Login('', 'teste_senha');
        expect($loginTest->validar())->toBe(['Login não definido!']);
    });

    it('Não deve validar login quando não estiver definida', function () {
        $loginTest = new Login('teste_login', '');
        expect($loginTest->validar())->toBe(['Senha não definida!']);
    });
});
