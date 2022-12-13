<?php

use App\Request;
use App\Route;
use App\Src\Aluno\AlunoControladora;
use App\Src\AlunoCurso\AlunoCursoControladora;
require_once 'app/src/config/pdo-connection.php';
$db = null;
try {
	$db = PDOConnection::getInstance();
} catch (Exception $e) {
	print $e->getMessage();
}

Route::get('/aluno-curso', function () use (&$db) {

	$controladora  = new AlunoCursoControladora($db);
	$request = new Request;
	$controladora->listar($request);
});
Route::get('/aluno-curso/{limit}/{offset}', function () use (&$db) {

	$controladora  = new AlunoCursoControladora($db);
	$request = new Request;
	$controladora->listar($request);
});
// Route::get('/aluno-curso/{limit}/{offset}', function () use (&$db) {

// 	$controladora  = new AlunoCursoControladora($db);
// 	$request = new Request;
// 	$controladora->listar($request);
// });

Route::post('/aluno-curso', function () use (&$db) {
	$controladora  = new AlunoCursoControladora($db);
	$request = new Request;
	$controladora->cadastrar($request);
});

Route::put('/aluno-curso/{$id}', function () use (&$db) {
	$controladora  = new AlunoCursoControladora($db);
	$request = new Request;
	$controladora->update($request);
});

Route::put('/aluno-curso/{$id}/show', function () use (&$db) {
	$controladora  = new AlunoCursoControladora($db);
	$request = new Request;
	$controladora->comId($request);
});

Route::delete('/aluno-curso/{$id}', function () use (&$db) {
	$controladora  = new AlunoCursoControladora($db);
	$request = new Request;
	$controladora->delete($request);
});

Route::get('/aluno', function () use (&$db) {
	$controladora  = new AlunoControladora($db);
	$request = new Request;
	$controladora->listar($request);
});

Route::get('/aluno/{limit}/{offset}', function () use (&$db) {
	$controladora  = new AlunoControladora($db);
	$request = new Request;
	$controladora->listar($request);
});

Route::post('/aluno', function () use (&$db) {
	$controladora  = new AlunoControladora($db);
	$request = new Request;
	$controladora->cadastrar($request);
});
