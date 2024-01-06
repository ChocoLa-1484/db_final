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
}