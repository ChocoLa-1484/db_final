<?php
require_once __DIR__ . "/../inc/bootstrap.php";
class ItemModel extends Database{
    public function getAllItems() {
        $result = $this->query("SELECT * FROM item");
        return $result;
    }
    public function getItemStatus($itemName) {
        $result = $this->query("SELECT * FROM item WHERE ItemName = ?", [$itemName]);
        return $result;
    }
    public function addItem($itemName, $HP, $MP, $AD, $AP, $AR, $MR, $SPD, $haste, $unique, $boots, $doran) {
        $result = $this->query("INSERT INTO item VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", 
                [$itemName, $HP, $MP, $AD, $AP, $AR, $MR, $SPD, $haste, $unique, $boots, $doran]);
        return $result;
    }
    public function modifyItem($newItemName, $HP, $MP, $AD, $AP, $AR, $MR, $SPD, $haste, $unique, $boots, $doran, $oldItemName) {
        $result = $this->query(
            "UPDATE item 
            SET ItemName = ?, HP = ?, MP = ?, AD = ?, AP = ?, AR = ?, MR = ?, SPD = ?, Haste = ?, UNIQUE_ITEM = ?, Boots = ?, Doran = ? 
            WHERE ItemName = ?",
            [$newItemName, $HP, $MP, $AD, $AP, $AR, $MR, $SPD, $haste, $unique, $boots, $doran, $oldItemName]
        );
        return $result;
    }
    public function deleteItem($itemName) {
        $result = $this->query("DELETE FROM item WHERE ItemName = ?", [$itemName]);
        return $result;
    }
    public function getItemNum() {
        $result = $this->query("SELECT COUNT(*) FROM item");
        return $result;
    }
}