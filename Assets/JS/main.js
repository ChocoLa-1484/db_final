document.addEventListener('DOMContentLoaded', function() {   
    generateLevel();
    getSelectedChampion();
    let levelSelect = document.getElementById('levelSelect');
    levelSelect.addEventListener('change', updateStatus);
    
    function generateLevel() {
        var levelSelect = document.getElementById('levelSelect');

        for (var level = 1; level <= 18; level++) {
            var option = document.createElement('option');
            option.value = level;
            option.text = level;
            levelSelect.add(option);
        }
    }
    
    let selectedChampion;
    
    function getSelectedChampion() {
        let selectedChampionElement = document.getElementById('selectedChampion');
        let selectedChampionImg = document.getElementById('selectedChampionImg');
        
        let testForm = new FormData();
        testForm.append("action", "getSelectedChampion");
        fetch("Controller/Api/ChampionController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.text())
        .then(data => {
            selectedChampionElement.innerHTML = 'Selected Champion: ' + data;
            selectedChampionImg.src = 'Images/' + data + '.webp';
            selectedChampion = data;
            getChampionStatus();
            getChampionSkills();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    let hpBase = document.getElementById('hpValue');
    let mpBase = document.getElementById('mpValue');
    let dmgBase = document.getElementById('dmgValue');
    let arBase = document.getElementById('arValue');
    let mrBase = document.getElementById('mrValue');
    let spdBase = document.getElementById('spdValue');
    let hasteBase = document.getElementById('hasteValue');
    let hpBonus, mpBonus, dmgBonus, arBonus, mrBonus, spdBonus = 0, hasteBonus = 0;
    
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
            hpBase = data[1];
            hpBonus = data[2];
            mpBase = data[3];
            mpBonus = data[4];
            dmgBase = data[5];
            dmgBonus = data[6];
            arBase = data[7];
            arBonus = data[8];
            mrBase = data[9];
            mrBonus = data[10];
            spdBase = data[12];
            hasteBase = data[13];
            updateStatus();
        })
        .catch(error => {
            console.error('Error fetching champion status:', error);
        });
    }
    
    function getChampionSkills() {
        ['Q','W','E','R'].forEach((button, index) => {
            let testForm = new FormData();
            testForm.append("action", "getChampionSkill");
            testForm.append("selectedChampion", selectedChampion);
            testForm.append("button", button);
            fetch("Controller/Api/ChampionController.php", {
                method: "POST",
                body: testForm
            })
            .then(response => response.json())
            .then(data => {
                let skillImg = document.getElementById('skillImg' + (index + 1).toString());
                let skillName = document.getElementById('skillName' + (index + 1).toString());
                let button = document.getElementById('button' + (index + 1).toString());
                let dmg = document.getElementById('dmg' + (index + 1).toString());
                let cd = document.getElementById('cd' + (index + 1).toString());
                let dmgType = document.getElementById('dmgType' + (index + 1).toString());
                skillImg.src = "Images/" + data[21] + '.webp';
                skillName.textContent = data[21];
                button.textContent = data[20];
                dmg.textContent = data[22];
                cd.textContent = data[28];
                dmgType.textContent = data[30];
            })
            .catch(error => {
                console.error('Error fetching champion status:', error);
            }); 
        });
    }
    
    let item1 = document.getElementById('item1');
    let item2 = document.getElementById('item2');
    let item3 = document.getElementById('item3');
    let item4 = document.getElementById('item4');
    let item5 = document.getElementById('item5');
    let item6 = document.getElementById('item6');
    let hpOther = 0, mpOther = 0, adOther = 0, apOther = 0, arOther = 0, mrOther = 0, spdOther = 0, hasteOther = 0;
    function getItem() {
//        item1.textContent = data[14];
//        item2.textContent = data[15];
//        item3.textContent = data[16];
//        item4.textContent = data[17];
//        item5.textContent = data[18];
//        item6.textContent = data[19];
    }
    
    function updateStatus() {
        let level = parseInt(levelSelect.value); // 取得選擇的等級，須確保是數字
        // 計算每個屬性的值
        hpBase.textContent = calAttribute(hpBase.value, hpOther, hpBonus, level);
        mpBase.textContent = calAttribute(mpBase.value, mpOther, mpBonus, level);   
        dmgBase.textContent = calAttribute(dmgBase.value, adOther, dmgBonus, level);
        arBase.textContent = calAttribute(arBase.value, arOther, arBonus, level);
        mrBase.textContent = calAttribute(mrBase.value, mrOther, mrBonus, level);
        spdBase.textContent = calAttribute(spdBase.value, spdOther, spdBonus, level);
        hasteBase.textContent = calAttribute(hasteBase.value, hasteOther, hasteBonus, level);
    }
    
    function calAttribute(base, other, bonus, level) {
        
        st =  bonus * (level - 1) * (0.7025 + 0.0175 * (level-1));
        console.log(base);
        console.log(typeof(base));
//        return (base + other + bonus * (level - 1) * (0.7025 + 0.0175 * (level-1))).toString();
        return st;
    }
});