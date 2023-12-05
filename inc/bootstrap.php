<?php
define("PROJECT_ROOT_PATH", __DIR__ . "/../");
// include the base controller file 
require_once PROJECT_ROOT_PATH . "/Controller/Api/BaseController.php";
// include the use model file 
require_once PROJECT_ROOT_PATH . "/Model/Database.php";
require_once PROJECT_ROOT_PATH . "/Model/ChampionModel.php";

define('DB_HOST', 'localhost');
define('DB_USERNAME', 'choco');
define('DB_PASSWORD', 'choco');
define('DB_DATABASE_NAME', 'db_final');