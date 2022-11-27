<?php

use App\Route;
use App\Src\Controller;

Route::get('/', function(){
	echo "Página inicial";
});

Route::get(['set' => '/cliente', 'as' => 'clientes.index'], Controller::class.'@index');

Route::get(['set' => '/cliente/listar/{id}/show', 'as' => 'clientes.show'], Controller::class.'@show');
Route::get(['set' => '/cliente/{id}/show', 'as' => 'clientes.show'], Controller::class.'@show');


Route::delete(['set' => 'cliente/delete', 'as' => 'clientes.delete'], Controller::class.'@teste');
