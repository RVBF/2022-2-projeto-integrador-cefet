<?php

/**
 *  Informações do servidor.
 *
 *  @author	Rafael Vinicius Barros Ferreira
 * */
return [
	'connections' => [
		'mysql' => [
			'driver' => 'mysql',
			//  'url' => env('DATABASE_URL'),
			'host' => getenv('MYSQL_DB_HOST') ? getenv('MYSQL_DB_HOST') : 'localhost',
			'port' => getenv('MYSQL_DOCKER_PORT') ? getenv('MYSQL_DOCKER_PORT') : '3306',
			'database' => getenv('MYSQL_DB_DATABASE') ? getenv('MYSQL_DB_DATABASE') : 'pis-grupo1',
			'username' => getenv('MYSQL_DB_USER') ? getenv('MYSQL_DB_USER') : 'root',
			'password' => getenv('MYSQL_DB_PASSWORD') ? getenv('MYSQL_DB_PASSWORD') : '',
			'password_root' => getenv('MYSQL_DB_ROOT_PASSWORD') ? getenv('MYSQL_DB_ROOT_PASSWORD') : '',
			'charset' => getenv('MYSQL_CHARSET') ? getenv('MYSQL_CHARSET') : 'uft8',
			'collation' => getenv('MYSQL_COLLATION') ? getenv('MYSQL_COLLATION') : 'utf8_unicode_ci',
		],
	],
];
