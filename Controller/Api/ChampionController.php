<?php
require_once __DIR__ . "/../../inc/bootstrap.php";
class ChampionController extends BaseController{
    private $championModel, $itemModel;
    public function __construct()
    {
        parent::__construct(); 
        $this->championModel = new ChampionModel();
        $this->itemModel = new itemModel();
    }
    public function handleRequest() {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $action = isset($_POST["action"]) ? $_POST["action"] : null;

            switch ($action) {
                case 'getAllChampions':
                    $this->getAllChampions();
                    break;
                case 'getChampionStatus':
                    $this->getChampionStatus();
                    break;
                case 'getSelectedChampion':
                    $this->getSelectedChampion();
                    break;
                case 'getChampionSkill':
                    $this->getChampionSkill();
                    break;
                case 'setSelectedChampion':
                    $this->setSelectedChampion();
                    break;
                case 'setSelectedChampion':
                    $this->setSelectedChampion();
                    break;
                default:
                    break;
            }
        }
    }
    private function getChampionStatus() {
        $selectedChampion = isset($_POST["selectedChampion"]) ? $_POST["selectedChampion"] : null;
        $result = $this->championModel->getChampionStatus($selectedChampion);
        if ($result) {
            $this->sendOutput(json_encode($result[0]));
        }
    }
    private function getChampionSkill() {
        $selectedChampion = isset($_POST["selectedChampion"]) ? $_POST["selectedChampion"] : null;
        $button = isset($_POST['button']) ? $_POST['button'] : null;
        $result = $this->championModel->getChampionSkill($selectedChampion, $button);
        if ($result) {
            $this->sendOutput(json_encode($result[0]));
        }
    }
    private function getAllChampions() {
        $result = $this->championModel->getAllChampions();
        $this->sendOutput(json_encode($result));
    }
    private function getSelectedChampion() {
        if (isset($_SESSION['selectedChampion'])) {
            $selectedChampion = $_SESSION['selectedChampion'];  
            $this->sendOutput($selectedChampion);
        } else {
            $this->sendOutput('NONE');
        }
    }
    private function setSelectedChampion() {
        $selectedChampion = isset($_POST["selectedChampion"]) ? $_POST["selectedChampion"] : null;
        $_SESSION["selectedChampion"] = $selectedChampion;
    }
    private function updateChampionItem() {
        $selectedChampion = isset($_POST["selectedChampion"]) ? $_POST["$selectedChampion"] : null;
        $itemName = isset($_POST["itemName"]) ? isset($_POST["itemName"]) : null;
        $itemNumber = isset($_POST["itemNumber"]) ? isset($_POST["itemNumber"]) : null;
        
        $isDoran = $_SESSION["isDoran"] ? true : false;
        $isBoots = $_SESSION["isBoots"] ? true : false;
        $isUnique = $_SESSION["isUnique"] ? true : false;
        
        $isUpdateAllowed = $this->itemModel->getItemStatus($itemName);
        
        if (isUpdateAllowed) {
            $result = $this->championModel->updateChampionItem($selectedChampion, $itemName, $itemNumber);
            if ($result) {
                $this->sendOutput(json_encode($result));
            }
        } else {
            $this->sendOutput(json_encode("Can't update"));
        }

    }
}
$test = new ChampionController();
$test->handleRequest();