document.addEventListener('DOMContentLoaded', function() {   
    getAllItems();

    function getAllItems() {
        let testForm = new FormData();
        testForm.append("action", "getAllItems");
        fetch("Controller/Api/ItemController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.json())
        .then(data => {
//            console.log(data);
            generateItems(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function generateItems(items) {
        let itemTable = document.getElementById("itemInfo");
        let htmlContent = `<tr>
                                <th>ItemIcon</th>
                                <th>ItemName</th>
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
            htmlContent += '<tr>';
            htmlContent += `<td><img src="Images/${item[0]}.webp" alt="None"></td>
                            <td id="selectedItem">${item[0]}</td>
                            <td>${item[1]}</td>
                            <td>${item[2]}</td>
                            <td>${item[3]}</td>
                            <td>${item[4]}</td>
                            <td>${item[5]}</td>
                            <td>${item[6]}</td>
                            <td>${item[7]}</td>
                            <td>${item[8]}</td>
                            <td>${item[9]}</td>
                            <td>${item[10]}</td>
                            <td>${item[11]}</td>`;
            htmlContent += '</tr>';
        });
        
        itemTable.innerHTML = htmlContent;
        
        let selectedItem = document.querySelectorAll('#selectedItem');
        selectedItem.forEach(item => {
            item.addEventListener('click', selectItem);
        });
    }

    function selectItem(event) {
        
    }
});