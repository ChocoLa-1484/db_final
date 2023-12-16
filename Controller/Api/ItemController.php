<?php
require_once __DIR__ . "/../../inc/bootstrap.php";
class ItemController extends BaseController{
    private $ItemModel;
    public function __construct()
    {
        parent::__construct(); 
        $this->ItemModel = new ItemModel();
    }
    public function handleRequest() {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $action = isset($_POST["action"]) ? $_POST["action"] : null;

            switch ($action) {
                case 'getAllItems':
                    $this->getAllItems();
                    break;
                default:
                    break;
            }
        }
    }
    private function getAllItems() {
        $result = $this->ItemModel->getAllItems();
        if ($result) {
            $this->sendOutput(json_encode($result));
        }
    }
}
$test = new ItemController();
$test->handleRequest();