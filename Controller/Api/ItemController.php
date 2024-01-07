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
                case 'addItem':
                    $this->addItem();
                    break;
                case 'modifyItem':
                    $this->modifyItem();
                    break;
                case 'deleteItem':
                    $this->deleteItem();
                    break;
                default:
                    break;
            }
        } else if($_SERVER["REQUEST_METHOD"] == "GET"){
            $action = isset($_GET["action"]) ? $_GET["action"] : null;

            switch ($action) {
                case 'getItemNum':
                    $this->getItemNum();
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
        $itemName = $_POST["itemName"] ?? null;
        $result = $this->ItemModel->getItemStatus($itemName);
        if ($result) {
            $this->sendOutput(json_encode($result[0]));
        }
    }
    private function addItem() {
        $itemName = $_POST["itemName"] ?? null;
        $HP = (int)$_POST["hp"] ?? null;
        $MP = (int)$_POST["mp"] ?? null;
        $AD = (int)$_POST["ad"] ?? null;
        $AP = (int)$_POST["ap"] ?? null;
        $AR = (int)$_POST["ar"] ?? null;
        $MR = (int)$_POST["mr"] ?? null;
        $SPD = (int)$_POST["spd"] ?? null;
        $haste = (int)$_POST["haste"] ?? null;
        $unique = (int)$_POST["unique"] ?? null;
        $boots = (int)$_POST["boots"] ?? null;
        $doran = (int)$_POST["doran"] ?? null;
        
        $result = $this->ItemModel->addItem($itemName, $HP, $MP, $AD, $AP, $AR, $MR, $SPD, $haste, $unique, $boots, $doran);
        if ($result === false) {
            $this->sendOutput("新增裝備失敗 已有此裝備");
        } else {
            $this->sendOutput("新增裝備成功");
        }
    }
    private function getItemNum() {
        $result = $this->ItemModel->getItemNum();
        if ($result) {
            $this->sendOutput(json_encode($result[0]));
        }
    }
    private function modifyItem() {
        $oldItemName = $_POST["oldItemName"] ?? null;
        $HP = (int)$_POST["hp"] ?? null;
        $MP = (int)$_POST["mp"] ?? null;
        $AD = (int)$_POST["ad"] ?? null;
        $AP = (int)$_POST["ap"] ?? null;
        $AR = (int)$_POST["ar"] ?? null;
        $MR = (int)$_POST["mr"] ?? null;
        $SPD = (int)$_POST["spd"] ?? null;
        $haste = (int)$_POST["haste"] ?? null;
        $unique = (int)$_POST["unique"] ?? null;
        $boots = (int)$_POST["boots"] ?? null;
        $doran = (int)$_POST["doran"] ?? null;
        $newItemName = $_POST["newItemName"] ?? null;
        $result = $this->ItemModel->modifyItem($newItemName, $HP, $MP, $AD, $AP, $AR, $MR, $SPD, $haste, 
                $unique, $boots, $doran, $oldItemName);
        if ($result === false) {
            $this->sendOutput("變更裝備失敗 請注意數值");
        } else {
            $this->sendOutput("變更裝備成功");
        }
    }
    private function deleteItem() {
        $itemName = $_POST["itemName"] ?? null;
        $result = $this->ItemModel->deleteItem($itemName);
        if ($result === false) {
            $this->sendOutput("刪除裝備失敗");
        } else {
            $this->sendOutput("刪除裝備成功");
        }
    }
}
$test = new ItemController();
$test->handleRequest();