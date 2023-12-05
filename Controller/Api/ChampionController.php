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
                    //$this->getChampionStatus($championName);
                    break;
                default:
                    break;
            }
        }
    }
    private function getChampionStatus($championName) {
        $result = $this->championModel->getChampionStatus($championName);
        $this->sendOutput($result);
    }
    private function getAllChampions() {
        $result = $this->championModel->getAllChampions();
        $this->sendOutput(json_encode($result));
    }
}
$test = new ChampionController();
$test->handleRequest();