<?php
require_once __DIR__ . "/../inc/bootstrap.php";
class ChampionModel extends Database{
    public function getChampionStatus($selectedChampion) {
        $result = $this->query("SELECT * FROM champion WHERE ChampionName = ?", [$selectedChampion]);
        return $result;
    }
    public function getAllChampions() {
        $result = $this->query("SELECT ChampionName FROM champion");
        return $result;
    }
}