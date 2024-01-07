document.addEventListener('DOMContentLoaded', () => {
    getSelectedChampion();
    let addButton = document.getElementById('addButton');
    addButton.addEventListener('click', addSkill);
    
    function getSelectedChampion() {
        let selectedChampionElement = document.getElementById('ChampionName');
        
        let testForm = new FormData();
        testForm.append("action", "getSelectedChampion");
        fetch("Controller/Api/ChampionController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.text())
        .then(data => {
            selectedChampionElement.innerHTML = data;
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    function addSkill() {
        let skillForm = document.getElementById('skillForm');
        let testForm = new FormData(skillForm);
        testForm.append("action", "addSkill");
        fetch("Controller/Api/SkillController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.text())
        .then(data => {
            window.alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});