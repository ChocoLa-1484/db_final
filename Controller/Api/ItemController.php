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
                case 'getItemStatus':
                    $this->getItemStatus();
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
    private function getItemStatus() {
        $itemName = isset($_POST["itemName"]) ?? null;
        $result = $this->ItemModel->getItemStatus($itemName);
        if ($result) {
            $this->sendOutput(json_encode($result[0]));
        }
    }
}
$test = new ItemController();
$test->handleRequest();