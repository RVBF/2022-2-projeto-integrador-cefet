<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
include 'vendor/autoload.php';


function debug($data)
{
    echo "<pre>";
    print_r($data);
    echo "</pre>";
    // exit;
}

session_start();
try {
    include __DIR__ . '/app/routes/routes.php';
} catch (\Exception $e) {
    echo $e->getMessage();
}
