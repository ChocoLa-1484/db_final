<?php
require_once __DIR__ . "/../../inc/bootstrap.php";
class SkillController extends BaseController{
    private $SkillModel;
    public function __construct()
    {
        parent::__construct(); 
        $this->SkillModel = new SkillModel();
    }
    public function handleRequest() {
        if ($_SERVER["REQUEST_METHOD"] == "POST") {
            $action = isset($_POST["action"]) ? $_POST["action"] : null;

            switch ($action) {
                case 'addSkill':
                    $this->addSkill();
                    break;
            }
        }
    }
    private function addSkill() {
        $ChampionName = $_SESSION["selectedChampion"] ?? null;
        $Button = $_POST["button"] ?? null;
        $SkillName = $_POST["skillName"] ?? null;
        $Base = (int)$_POST["base"] ?? null;
        $BaseBonus = (int)$_POST["baseBonus"] ?? null;
        $AD = (float)$_POST["ad"] ?? null;
        $ADBonus = (float)$_POST["adBonus"] ?? null;
        $AP = (float)$_POST["ap"] ?? null;
        $APBonus = (float)$_POST["apBonus"] ?? null;
        $ADOtherBase = (float)$_POST["adOtherBase"] ?? null;
        $ADOtherBonus = (float)$_POST["adOtherBonus"] ?? null;
        $APOtherBase = (float)$_POST["apOtherBase"] ?? null;
        $APOtherBonus = (float)$_POST["apOtherBonus"] ?? null;
        $CD = (float)$_POST["cd"] ?? null;
        $CDBonus = (float)$_POST["cdBonus"] ?? null;
        $DMGtype = $_POST["dmgType"] ?? null;
        $result = $this->SkillModel->addSkill($ChampionName, $Button, $SkillName, $Base, $BaseBonus, $AD, $ADBonus, 
                $AP, $APBonus, $ADOtherBase, $ADOtherBonus, $APOtherBase, $APOtherBonus, $CD, $CDBonus, $DMGtype);
        if ($result === false) {
            $this->sendOutput("新增技能失敗 已有此技能");
        } else {
            $this->sendOutput("新增技能成功");
        }
    }
}
$test = new SkillController();
$test->handleRequest();