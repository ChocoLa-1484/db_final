<?php
require_once __DIR__ . "/../inc/bootstrap.php";
class ChampionModel extends Database{
    public function getChampionStatus($championName) {
        $result = $this->query("SELECT * FROM champion WHERE ChampionName = ?", [$championName]);
        return $result;
    }
    public function getAllChampions() {
        $result = $this->query("SELECT ChampionName FROM champion");
        return $result;
    }
}