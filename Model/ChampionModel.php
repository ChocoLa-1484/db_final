<?php
require_once __DIR__ . "/../inc/bootstrap.php";
class ChampionModel extends Database{
    public function getChampionSkill($selectedChampion, $button) {
        $result = $this->query("SELECT * FROM champion NATURAL JOIN skill WHERE ChampionName = ? and Button = ?", [$selectedChampion, $button]);
        return $result;
    }
    public function getChampionStatus($selectedChampion) {
        $result = $this->query("SELECT * FROM champion WHERE ChampionName = ?", [$selectedChampion]);
        return $result;
    }
    public function getAllChampions() {
        $result = $this->query("SELECT ChampionName FROM champion");
        return $result;
    }
    
}