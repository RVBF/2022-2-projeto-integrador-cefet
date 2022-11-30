<?php
class Conexao
{

    public function getConnection()
    {
        $pdo = null;
        try {
            $pdo = new PDO('mysql:dbname=pis-grupo1;host=localhost:3306', 'root', '', [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
            ]);
        } catch (PDOException $e) {
            $this->visao->exibirErroAoConectar($e->getMessage());
        }

        return $pdo;
    }
}
