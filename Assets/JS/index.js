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
                    
                    championItem.className = "champion";
                    championItemIcon.innerHTML = '<img src="Images/' + championName + '.jpg" class="championIcon">';
                    championItemName.innerHTML = '<h1 class="championName">' + championName + '</h1>';
                    
                    championItem.appendChild(championItemIcon);
                    championItem.appendChild(championItemName);
                    championInfoElement.appendChild(championItem);
                    
                    championItem.addEventListener("click", function() {
                        // Save the selected champion to the session
                        saveSelectedChampionToSession(championName);
                        // Redirect to the main.php page
                        window.location.href = "main.php";
                    });
                });
            }
            else {
                window.alert("Champions are lost?");
                window.location.href = "index.php";
            }
        })
        .catch(error => {
            console.error('Error fetching champion data:', error);
        });
    }
    function saveSelectedChampionToSession(championName) {
        let testForm = new FormData();
        testForm.append("action", "setSelectedChampion");
        testForm.append("selectedChampion", championName);
        fetch("Controller/Api/ChampionController.php", {
            method: "POST",
            body: testForm
        })
        .catch(error => {
            console.error('Error saving selected champion to session:', error);
        });
    }
});