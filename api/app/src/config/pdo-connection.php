<?php
class PDOConnection {

	protected static $instance;


	protected function __construct() {
   }

	public static function getInstance() {
      $app  = require_once 'app/src/config/servidor-config.php';
		
		if(empty(self::$instance)) {

			try {

				$options[ PDO::ATTR_PERSISTENT ] = true;
				$options[ PDO::MYSQL_ATTR_INIT_COMMAND ] = 'SET NAMES utf8';

				self::$instance = new PDO("mysql:dbname={$app['connections']['mysql']['database']};host={$app['connections']['mysql']['host']}", $app['connections']['mysql']['username'],  $app['connections']['mysql']['password'], $options);
				self::$instance->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_SILENT);  
			} catch(PDOException $error) {
				echo $error->getMessage();
			}

		}

		return self::$instance;
	}
}
