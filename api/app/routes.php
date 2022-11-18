<?php

use App\Route;

Route::get('/', function(){

	echo "Rota funcionando";
});

Route::get(['set' => '/cliente', 'as' => 'clientes.index'], 'Controller@index');

Route::get(['set' => '/cliente/{id}/show', 'as' => 'clientes.show'], 'Controller@show');


Route::delete(['set' => 'cliente/delete', 'as' => 'clientes.delete'], 'Controller@teste');