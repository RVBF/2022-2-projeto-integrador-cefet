<?php
require_once 'app/src/config/pdo-connection.php';

use App\Request;
use App\Route;
use App\Src\AlunoCurso\AlunoCursoController;
use App\Src\Controller;
use App\Src\Aluno\AlunoController;

$db = null;
try {
	$db = PDOConnection::getInstance();
} catch (Exception $e) {
	print $e->getMessage();
}

Route::get('/aluno-curso', function () use (&$db) {

	$controller  = new AlunoCursoController($db);
	$request = new Request;
	$controller->listar($request);
});
Route::get('/aluno-curso/{limit}/{offset}', function () use (&$db) {

	$controller  = new AlunoCursoController($db);
	$request = new Request;
	$controller->listar($request);
});
Route::get('/aluno-curso/{limit}/{offset}', function () use (&$db) {

	$controller  = new AlunoCursoController($db);
	$request = new Request;
	$controller->listar($request);
});

Route::post('/aluno-curso', function () use (&$db) {
	$controller  = new AlunoCursoController($db);
	$request = new Request;
	$controller->cadastrar($request);
});

Route::put('/aluno-curso/{$id}', function () use (&$db) {
	$controller  = new AlunoCursoController($db);
	$request = new Request;
	$controller->update($request);
});

Route::put('/aluno-curso/{$id}/show', function () use (&$db) {
	$controller  = new AlunoCursoController($db);
	$request = new Request;
	$controller->comId($request);
});

Route::delete('/aluno-curso/{$id}', function () use (&$db) {
	$controller  = new AlunoCursoController($db);
	$request = new Request;
	$controller->delete($request);
});



Route::get('/aluno', function () use (&$db) {
	$controller  = new AlunoController($db);
	$request = new Request;
	$controller->listar($request);
});

Route::get('/aluno/{limit}/{offset}', function () use (&$db) {
	$controller  = new AlunoController($db);
	$request = new Request;
	$controller->listar($request);
});