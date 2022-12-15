<?php
namespace App\Src\Funcionario;

interface FuncionarioRepositorio
{
    public function todos($tamanho = 0, $salto = 0);
    public function adicionar(Funcionario &$funcionario);
    public function atualizar(Funcionario &$funcionario);
    public function comId($id);
    public function delete($id);
}
