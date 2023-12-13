<?php
require_once __DIR__ . "/../../inc/bootstrap.php";
class ChampionController extends BaseController{
    private $championModel;
    public function __construct()
    {
        parent::__construct(); 
        $this->championModel = new ChampionModel();
    }
    public function handleRequest() {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $action = isset($_POST["action"]) ? $_POST["action"] : null;

            switch ($action) {
                case 'getAllChampions':
                    $this->getAllChampions();
                    break;
                case 'getChampionStatus':
<<<<<<< HEAD
                    $this->getChampionStatus();
                    break;
                case 'getSelectedChampion':
                    $this->getSelectedChampion();
                    break;
                case 'setSelectedChampion':
                    $this->setSelectedChampion();
=======
                    //$this->getChampionStatus($championName);
>>>>>>> d4bbc11fc9c74cca0906468177a08cdb834940a3
                    break;
                default:
                    break;
            }
        }
    }
    private function getChampionStatus() {
        $selectedChampion = isset($_POST["selectedChampion"]) ? $_POST["selectedChampion"] : null;
        $result = $this->championModel->getChampionStatus($selectedChampion);
        $this->sendOutput(json_encode($result));
    }
    private function getAllChampions() {
        $result = $this->championModel->getAllChampions();
        $this->sendOutput(json_encode($result));
    }
<<<<<<< HEAD
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
=======
>>>>>>> d4bbc11fc9c74cca0906468177a08cdb834940a3
}
$test = new ChampionController();
$test->handleRequest();