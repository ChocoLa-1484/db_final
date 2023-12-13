document.addEventListener('DOMContentLoaded', function() {
    let selectedChampion;
    generateLevel();
    getSelectedChampion(); 
    
    function generateLevel() {
        var levelSelect = document.getElementById('levelSelect');

        for (var level = 1; level <= 18; level++) {
            var option = document.createElement('option');
            option.value = level;
            option.text = level;
            levelSelect.add(option);
        }
    }
    
    function getSelectedChampion() {
        let selectedChampionElement = document.getElementById('selectedChampion');
        
        let testForm = new FormData();
        testForm.append("action", "getSelectedChampion");
        fetch("Controller/Api/ChampionController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.text())
        .then(data => {
            selectedChampionElement.innerHTML = 'Selected Champion: ' + data;
            selectedChampion = data;
            getChampionStatus();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    let levelSelect = document.getElementById('levelSelect');
    let hpValue = document.getElementById('hpValue');
    let mpValue = document.getElementById('mpValue');
    let arValue = document.getElementById('arValue');
    let mrValue = document.getElementById('mrValue');
    
    function getChampionStatus() {      
        let testForm = new FormData();
        testForm.append("action", "getChampionStatus");
        testForm.append("selectedChampion", selectedChampion);
        fetch("Controller/Api/ChampionController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            hpValue.textContent = 'HP: ' + data;
        })
        .catch(error => {
            console.error('Error fetching champion status:', error);
        });
    }
    
    function updateAttributes() {

        levelSelect.addEventListener('change', function() {
            // 在這裡使用選定的等級來更新屬性
            let selectedLevel = levelSelect.value;

            let testForm = new FormData();
            testForm.append("action", "updateAttributes");
            fetch('Controller/Api/ChampionController.php', {
                method: 'POST',
                body: testForm
            })
            .then(response => response.json())
            .then(data => {
                hpValue.textContent = 'HP: ' + data.hp;
                mpValue.textContent = 'MP: ' + data.mp;
                arValue.textContent = 'AR: ' + data.ar;
                mrValue.textContent = 'MR: ' + data.mr;
            })
            .catch(error => {
                console.error('Error:', error);
            });
        });
    }
});