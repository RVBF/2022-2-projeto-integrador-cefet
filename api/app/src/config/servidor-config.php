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
			 'host' => getenv('MYSQL_DB_HOST'),
			 'port' => getenv('MYSQL_DOCKER_PORT'),
			 'database' => getenv('MYSQL_DB_DATABASE'),
			 'username' => getenv('MYSQL_DB_USER'),
			 'password' => getenv('MYSQL_DB_PASSWORD'),
			 'password_root' => getenv('MYSQL_DB_ROOT_PASSWORD'),
			 'charset' => getenv('MYSQL_CHARSET'),
			 'collation' => getenv('MYSQL_COLLATION'),
		],
  ],
 ]

?>
