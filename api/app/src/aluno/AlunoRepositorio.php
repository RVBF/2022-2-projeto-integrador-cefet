<?php
namespace App\Src\Aluno;

interface AlunoRepositorio
{
    public function todos($tamanho = 0, $salto = 0);
    public function adicionar(Aluno &$curso);
    public function atualizar(Aluno &$curso);
    public function comId($id);
    public function delete($id);

}
