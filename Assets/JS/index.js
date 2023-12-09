document.addEventListener("DOMContentLoaded", () => {
    
    window.addEventListener("load", () => {
        getAllChampions();
    });
    
    function getAllChampions () {
        let testForm = new FormData();
        testForm.append("action", "getAllChampions");
        fetch("Controller/Api/ChampionController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.json())
        .then(data => {
            if (data.error === undefined) {
                let championInfoElement = document.getElementById("championInfo");
                // Clear previous content
                championInfoElement.innerHTML = "";
                // Display champion names
                data.forEach(championName => {
                    let championItem = document.createElement("div");
                    let championItemIcon = document.createElement("div");
                    let championItemName = document.createElement("div");
                    championItem.className = "champion"
                    championItemIcon.innerHTML = '<img src="Images/' + championName + '.jpg" class="championIcon">';
                    championItemName.innerHTML = '<p class="championName">' + championName + '</p>'
                    championItem.appendChild(championItemIcon);
                    championItem.appendChild(championItemName);
                    championInfoElement.appendChild(championItem);
                });
            }
            else {
                window.alert("Champions are lost?");
                window.location.href = "../../index.php";
            }
        })
        .catch(error => {
            console.error('Error fetching champion data:', error);
        });
    }
});