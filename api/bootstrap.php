<?php


error_reporting(E_ALL);
ini_set('display_errors', true);
 
require 'vendor/autoload.php';
 
use App\Route;

session_start();
try {
 
    require 'app/routes.php';
 
} catch(\Exception $e){
     
    echo $e->getMessage();
}