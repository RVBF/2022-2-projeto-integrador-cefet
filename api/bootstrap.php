<?php
error_reporting(E_ALL);
ini_set('display_errors', true);
// includ:e 'vendor/autoload.php';

try {
    include __DIR__ . '/app/routes/routes.php';
} catch (\Exception $e) {
    echo $e->getMessage();
}
