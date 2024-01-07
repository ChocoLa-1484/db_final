<?php
require_once __DIR__ . "/../inc/bootstrap.php";
class SkillModel extends Database{
    public function addSkill($ChampionName, $Button, $SkillName, $Base, $BaseBonus, $AD, $ADBonus, $AP, $APBonus, $ADOtherBase, $ADOtherBonus, $APOtherBase, $APOtherBonus, $CD, $CDBonus, $DMGtype) {
        $result = $this->query("INSERT INTO skill VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                [$ChampionName, $Button, $SkillName, $Base, $BaseBonus, $AD, $ADBonus, $AP, $APBonus, $ADOtherBase, $ADOtherBonus, $APOtherBase, $APOtherBonus, $CD, $CDBonus, $DMGtype]);
        return $result;
    }
}