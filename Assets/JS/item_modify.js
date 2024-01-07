document.addEventListener('DOMContentLoaded', function() {   
    getAllItems();
    getItemNum();
    
    function getAllItems() {
        let testForm = new FormData();
        testForm.append("action", "getAllItems");
        fetch("Controller/Api/ItemController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.json())
        .then(data => {
            generateItems(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function getItemNum() {
        fetch("Controller/Api/ItemController.php?action=getItemNum")
        .then(response => response.json())
        .then(data => {
//            console.log(data);
              document.getElementById("itemNum").innerHTML = "目前裝備總數量為" + data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function generateItems(items) {
        let itemTable = document.getElementById("itemInfo");
        itemTable.innerHTML = "";
        let htmlContent = `<tr>
                                <th>Save Modify</th>
                                <th>Delete</th>
                                <th>Item Icon</th>
                                <th>Item Name</th>
                                <th>HP</th>      
                                <th>MP</th>         
                                <th>AD</th>     
                                <th>AP</th>
                                <th>AR</th>
                                <th>MR</th>
                                <th>SPD</th>
                                <th>Haste</th>
                                <th>Unique</th>
                                <th>Boots</th>
                                <th>Doran</th>
                            </tr>`;
        
        items.forEach(item => {
            htmlContent += `<tr>
                            <td><input type="button" class="modifyButton" value="Save" data-value="${item[0]}"></td>
                            <td><input type="button" class="deleteButton" value="Delete" data-value="${item[0]}"></td>
                            <td><img src="Images/${item[0]}.webp" alt="None"></td>
                            <td><input type="text" class="itemName" name="newItemName" value="${item[0]}"></td>                            
                            <td><input type="number" name="hp" value="${item[1]}"></td>
                            <td><input type="number" name="mp" value="${item[2]}"></td>
                            <td><input type="number" name="ad" value="${item[3]}"></td>
                            <td><input type="number" name="ap" value="${item[4]}"></td>
                            <td><input type="number" name="ar" value="${item[5]}"></td>
                            <td><input type="number" name="mr" value="${item[6]}"></td>
                            <td><input type="number" name="spd" value="${item[7]}"></td>
                            <td><input type="number" name="haste" value="${item[8]}"></td>
                            <td><input type="number" name="unique" value="${item[9]}"></td>
                            <td><input type="number" name="boots" value="${item[10]}"></td>
                            <td><input type="number" name="doran" value="${item[11]}"></td>
                            </tr>`;
        });
        
        itemTable.innerHTML = htmlContent;
        itemTable.querySelectorAll(".modifyButton").forEach((item) => {
            item.addEventListener('click', () => {
                let oldItemName = item.getAttribute("data-value");
                let tr = item.parentElement.parentElement;
                modifyItem(oldItemName, tr);
            });
        });
        itemTable.querySelectorAll(".deleteButton").forEach((item) => {
            item.addEventListener('click', () => {
                let itemName = item.getAttribute("data-value");
                deleteItem(itemName);
            });
        });
    }
    function modifyItem(oldItemName, tr) {
        let testForm = new FormData();
        tr.querySelectorAll('input').forEach(input => {
            testForm.append(input.name, input.value);
            console.log(input.value);
        });
        testForm.append("action", "modifyItem");
        testForm.append("oldItemName", oldItemName);
        fetch("Controller/Api/ItemController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.text())
        .then(data => {
            getAllItems();
            getItemNum();
            window.alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    function deleteItem(itemName) {
        let testForm = new FormData();
        testForm.append("action", "deleteItem");
        testForm.append("itemName", itemName);
        fetch("Controller/Api/ItemController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.text())
        .then(data => {
            getAllItems();
            getItemNum();
            window.alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});