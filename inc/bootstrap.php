<?php
define("PROJECT_ROOT_PATH", __DIR__ . "/../");
// include the base controller file 
require_once PROJECT_ROOT_PATH . "/Controller/Api/BaseController.php";
// include the use model file 
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
require_once PROJECT_ROOT_PATH . "/Model/ChampionModel.php";
require_once PROJECT_ROOT_PATH . "/Model/ItemModel.php";

define('DB_HOST', 'localhost');
define('DB_USERNAME', 'pass');
define('DB_PASSWORD', 'pass');
define('DB_DATABASE_NAME', 'db_final');