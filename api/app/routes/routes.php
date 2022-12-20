<?php

use App\Request;
use App\Route;
use App\Src\Aluno\AlunoControladora;
use App\Src\AlunoCurso\AlunoCursoControladora;
use App\Src\Comum\Util;
use App\Src\Curso\CursoControladora;
use App\Src\Funcionario\FuncionarioControladora;

require_once 'app/src/config/pdo-connection.php';
$db = null;
try {
	$db = PDOConnection::getInstance();
} catch (Exception $e) {
	print $e->getMessage();
}


//notas
Route::get('/aluno-curso', function () use (&$db) {

	$controladora  = new AlunoCursoControladora($db);
	$request = new Request;
	$controladora->listar($request);
});

Route::post('/aluno-curso', function () use (&$db) {
	$controladora  = new AlunoCursoControladora($db);
	$request = new Request;
	$controladora->cadastrar($request);
});

Route::put('/aluno-curso/{id}', function () use (&$db) {
	$controladora  = new AlunoCursoControladora($db);
	$request = new Request;
	$controladora->atualizar($request);
});

Route::get('/aluno-curso/{id}', function () use (&$db) {
	$controladora  = new AlunoCursoControladora($db);
	$request = new Request;
	$controladora->comId($request);
});

Route::delete('/aluno-curso/{id}', function () use (&$db) {
	$controladora  = new AlunoCursoControladora($db);
	$request = new Request;
	$controladora->delete($request);
});


//alunos
Route::get('/aluno', function () use (&$db) {
	$controladora  = new AlunoControladora($db);
	$request = new Request;
	$controladora->listar($request);
});

Route::get('/aluno/numero-para-matricula', function () use (&$db) {
	$controladora  = new AlunoControladora($db);
	$request = new Request;
	$controladora->pegaProximoNumeroMatricula();
});

Route::get('/aluno/{id}/show', function () use (&$db) {
	$controladora  = new AlunoControladora($db);
	$request = new Request;
	$controladora->comId($request);
});

Route::put('/aluno/{id}/edit', function () use (&$db) {
	$controladora  = new AlunoControladora($db);
	$request = new Request;
	$controladora->atualizar($request);
});

Route::post('/aluno', function () use (&$db) {
	$controladora  = new AlunoControladora($db);
	$request = new Request;
	$controladora->cadastrar($request);
});

Route::delete('/aluno/{id}', function () use (&$db) {
	$controladora  = new AlunoControladora($db);
	$request = new Request;
	$controladora->delete($request);
});


//funcionarios
Route::get('/funcionario', function () use (&$db) {
	$controladora  = new FuncionarioControladora($db);
	$request = new Request;
	$controladora->listar($request);
});
Route::get('/funcionario/professores', function () use (&$db) {
	$controladora  = new FuncionarioControladora($db);
	$request = new Request;
	$controladora->listarProfessores($request);
});

Route::get('/funcionario/{id}/show', function () use (&$db) {
	$controladora  = new FuncionarioControladora($db);
	$request = new Request;
	$controladora->comId($request);
});

Route::put('/funcionario/{id}/edit', function () use (&$db) {
	$controladora  = new FuncionarioControladora($db);
	$request = new Request;
	$controladora->atualizar($request);
});

Route::post('/funcionario', function () use (&$db) {
	$controladora  = new FuncionarioControladora($db);
	$request = new Request;
	$controladora->cadastrar($request);
});

Route::delete('/funcionario/{id}', function () use (&$db) {
	$controladora  = new FuncionarioControladora($db);
	$request = new Request;
	$controladora->delete($request);
});

//cursos
Route::get('/curso', function () use (&$db) {
	$controladora  = new CursoControladora($db);
	$request = new Request;
	$controladora->listar($request);
});

Route::get('/curso/{id}/show', function () use (&$db) {
	$controladora  = new CursoControladora($db);
	$request = new Request;
	$controladora->comId($request);
});

Route::put('/curso/{id}/edit', function () use (&$db) {
	$controladora  = new CursoControladora($db);
	$request = new Request;
	$controladora->atualizar($request);
});

Route::post('/curso', function () use (&$db) {
	$controladora  = new CursoControladora($db);
	$request = new Request;
	$controladora->cadastrar($request);
});

Route::delete('/curso/{id}', function () use (&$db) {
	$controladora  = new CursoControladora($db);
	$request = new Request;
	$controladora->delete($request);
});
//login
Route::post('/login', function () use (&$db) {
	$controladora  = new LoginControladora($db);
	$request = new Request;
	$controladora->autenticar($request);
});

Route::post('/logout', function () use (&$db) {
	$controladora  = new LoginControladora($db);
	$request = new Request;
	$controladora->deslogar($request);
});
