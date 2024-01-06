document.addEventListener('DOMContentLoaded', function() {   
    generateLevel();
    generateSkillLevel();
    
    getAllItems();
    getSelectedChampion();

    let selectedChampion;

    let championBase;
    let skillBase = {};
    let championStatus;
    
    function generateLevel() {
        for (let level = 1; level <= 18; level++) {
            let levelSelect = document.getElementById('levelSelect');
            
            levelSelect.addEventListener('change', (event) => {
                updateChampionStatus(event, championBase);
                ['Q', 'W', 'E', 'R'].forEach ((button) => {
                    updateSkill(skillBase, championStatus, button);
                });
            });    
            
            let option = document.createElement('option');
            option.innerHTML = level;
            levelSelect.add(option);
        }
    }

    function generateSkillLevel() {
        for (let index = 1; index <= 3; index++) {
            let skillSelect = document.getElementById('skillSelect' + index);

            for (let level = 1; level <= 5; level++) {
                let option = document.createElement('option');
                option.innerHTML = level;
                skillSelect.add(option);
            }
        }
        let skillSelect = document.getElementById('skillSelect4');
        for (let level = 1; level <= 3; level++) {
            let option = document.createElement('option');
            option.innerHTML = level;
            skillSelect.add(option);
        }
        
        ['Q', 'W', 'E', 'R'].forEach((button, index) => {
            let skillSelect = document.getElementById('skillSelect' + (index + 1));
            skillSelect.addEventListener('change', () => {
                updateSkill(skillBase, championStatus, button);
            });
        });
    }

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
            selectedChampionElement.innerHTML = data;
            selectedChampionImg.src = 'Images/' + data + '.webp';
            selectedChampion = data;
            getChampionBase();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    function getChampionBase() {      
        let testForm = new FormData();
        testForm.append("action", "getChampionStatus");
        testForm.append("selectedChampion", selectedChampion);
        fetch("Controller/Api/ChampionController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.json())
        .then(data => {
            let hpBase = data[1];
            let hpBonus = data[2];
            let mpBase = data[3];
            let mpBonus = data[4];
            let adBase = data[5];
            let adBonus = data[6];
            let apBase = 0;
            let apBonus = 0;
            let arBase = data[7];
            let arBonus = data[8];
            let mrBase = data[9];
            let mrBonus = data[10];
            let spdBase = data[11];
            let spdBonus = 0;
            let hasteBase = 0;
            let hasteBonus = 0;
            
            championBase = {
                hpBase, hpBonus, mpBase, mpBonus, adBase, adBonus, apBase, apBonus, arBase, 
                arBonus, mrBase, mrBonus, spdBase, spdBonus, hasteBase, hasteBonus
            };
            
            const virtualEvent = {
                target: {
                    value: 1
                }
            };
            updateChampionStatus(virtualEvent, championBase);
            getChampionSkills();
        })
        .catch(error => {
            console.error('Error fetching champion status:', error);
        });
    }
    // 2科小符文適性 18 * 0.6 1科物防
    let hpOther = 0, mpOther = 0, adOtherValue = 18 * 0.6, apOtherValue = 0, arOtherValue = 6, mrOtherValue = 0, spdOtherValue = 0, hasteOther = 0;
    
    function updateChampionStatus(event, ch) {
        let level = parseInt(event.target.value); 
        
        let hpStatus = calAttribute(ch.hpBase, hpOther, ch.hpBonus, level);
        let mpStatus = calAttribute(ch.mpBase, mpOther, ch.mpBonus, level);
        let adStatus = calAttribute(ch.adBase, adOtherValue, ch.adBonus, level);
        let apStatus = calAttribute(ch.apBase, apOtherValue, ch.apBonus, level);
        let arStatus = calAttribute(ch.arBase, arOtherValue, ch.arBonus, level);
        let mrStatus = calAttribute(ch.mrBase, mrOtherValue, ch.mrBonus, level);
        let spdStatus = calAttribute(ch.spdBase, spdOtherValue, ch.spdBonus, level);
        let hasteStatus = calAttribute(ch.hasteBase, hasteOther, ch.hasteBonus, level);
        
        championStatus = {
            hpStatus, mpStatus, adStatus, apStatus, arStatus, mrStatus, spdStatus, hasteStatus
        };
        showChampionStatus(championStatus);
    }
    
    function showChampionStatus(ch) {
        let hpValue = document.getElementById('hpValue');
        let mpValue = document.getElementById('mpValue');
        let adValue = document.getElementById('adValue');
        let apValue = document.getElementById('apValue');
        let arValue = document.getElementById('arValue');
        let mrValue = document.getElementById('mrValue');
        let spdValue = document.getElementById('spdValue');
        let hasteValue = document.getElementById('hasteValue');
        
        hpValue.value = hpValue.innerHTML = ch.hpStatus.toString();
        mpValue.value = mpValue.innerHTML = ch.mpStatus.toString();
        adValue.value = adValue.innerHTML = ch.adStatus.toString();
        apValue.value = apValue.innerHTML = ch.apStatus.toString();
        arValue.value = arValue.innerHTML = ch.arStatus.toString();
        mrValue.value = mrValue.innerHTML = ch.mrStatus.toString();
        spdValue.value = spdValue.innerHTML = ch.spdStatus.toString();
        hasteValue.value = hasteValue.innerHTML = ch.hasteStatus.toString();
    }
    
    function calAttribute(base, other, bonus, level) {
        base = parseFloat(base);
        other = parseFloat(other);
        bonus = parseFloat(bonus);
        return Math.ceil(base + other + bonus * (level - 1) * (0.7025 + 0.0175 * (level - 1)));
    }
    
    async function getChampionSkills() {
        await Promise.all(['Q','W','E','R'].map(async (button, index) => {
            let testForm = new FormData();
            testForm.append("action", "getChampionSkill");
            testForm.append("selectedChampion", selectedChampion);
            testForm.append("button", button);

            try {
                let response = await fetch("Controller/Api/ChampionController.php", {
                    method: "POST",
                    body: testForm
                });

                let data = await response.json();
//                console.log(data);
                let skillImg = document.getElementById('skillImg' + (index + 1));
                let buttonElement = document.getElementById('button' + (index + 1));
                let skillName = document.getElementById('skillName' + (index + 1));
                let dmgType = document.getElementById('dmgType' + (index + 1));

                buttonElement.innerHTML = data[12];
                skillName.innerHTML = data[13];
                skillImg.src = "Images/" + data[13] + '.webp';
                dmgType.innerHTML = data[26];

                let baseSkill = data[14];
                let bonusSkill = data[15];
                let adBaseSkill = data[16];
                let adBonusSkill = data[17];
                let apBaseSkill = data[18];
                let apBonusSkill = data[19];
                let adOtherBase = data[20];
                let adOtherBonus = data[21];
                let apOtherBase = data[22];
                let apOtherBonus = data[23];
                let cdBase = data[24];
                let cdBonus = data[25];
                let button = data[12];
                
                skillBase[button] = {
                    baseSkill, bonusSkill, adBaseSkill, adBonusSkill, apBaseSkill, apBonusSkill,
                    adOtherBase, adOtherBonus, apOtherBase, apOtherBonus, cdBase, cdBonus
                };
            } catch (error) {
                console.error('Error fetching champion status:', error);
            }
        }));
        ['Q', 'W', 'E', 'R'].forEach ((button) => {
            updateSkill(skillBase, championStatus, button);
        });
    }
    
    const buttonToIndex = {
        'Q': 1,
        'W': 2,
        'E': 3,
        'R': 4
    };
    function updateSkill(sk, ch, button) {
        let index = buttonToIndex[button];
        let skillSelect = document.getElementById('skillSelect' + index);
        let level = parseInt(skillSelect.value);
        let dmg = document.getElementById('dmg' + index);
        dmg.value = dmg.innerHTML = calSkill(sk[button], ch, level).toString();
        let cd = document.getElementById('cd' + index);
        cd.value = cd.innerHTML = calCD(sk[button], ch, level).toString();
    }   
    function calSkill(sk, ch, level) {
        let baseSkill = parseFloat(sk.baseSkill); 
        let bonusSkill = parseFloat(sk.bonusSkill);
        let adBaseSkill = parseFloat(sk.adBaseSkill);
        let adBonusSkill = parseFloat(sk.adBonusSkill);
        let apBaseSkill = parseFloat(sk.apBaseSkill);
        let apBonusSkill = parseFloat(sk.apBonusSkill);
        let adOtherBase = parseFloat(sk.adOtherBase);
        let adOtherBonus = parseFloat(sk.adOtherBonus);
        let apOtherBase = parseFloat(sk.apOtherBase);
        let apOtherBonus = parseFloat(sk.apOtherBonus);
        
        let baseT = (baseSkill + bonusSkill * (level - 1));
        let adT = (adBaseSkill + adBonusSkill * (level - 1));
        let apT = (apBaseSkill + apBonusSkill * (level - 1));
        let adOtherT = (adOtherBase + adOtherBonus * (level - 1));
        let apOtherT = (apOtherBase + apOtherBonus * (level - 1));
        
        let adStatus = parseFloat(ch.adStatus);
        let apStatus = parseFloat(ch.apStatus);
//        let adOtherValue = parseFloat(adOtherValue);
//        let apOtherValue = parseFloat(apOtherValue);
        
//        return baseT + adT * adValue + apT * apValue + adOtherT * adOtherValue + apOtherT * apOtherValue;
        return Math.ceil(baseT + adT * adStatus + apT * apStatus);
    }
    function calCD(sk, ch, level) {
        let cdBase = parseFloat(sk.cdBase);
        let cdBonus = parseFloat(sk.cdBonus);
        let cdT = (cdBase + cdBonus * (level - 1));
        return cdT;
    }
    
    function generateItems(items) {
        let dropdown = document.getElementById("item-dropdown-content");
        let htmlContent = '';
        
        items.forEach((item, index) => {
            if (index % 6 === 0) {
                htmlContent += '<div class="row">';
            }
            htmlContent += `<div class="item-in-dropdown" data-value="${item[0]}">
                                <img src="Images/${item[0]}.webp" alt="None">
                                <p>${item[0]}</p>
                            </div>`;
            if ((index + 1) % 6 === 0 || index === items.length - 1) {
                htmlContent += '</div>';
            }
        });
        
        dropdown.innerHTML = htmlContent;
        
        let itemsInDropdown = document.querySelectorAll('.item-in-dropdown');
        itemsInDropdown.forEach(item => {
            item.addEventListener('click', handleItemClick);
        });
    }
    
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
    
    let dropdownBtn = document.getElementById("item-dropdown-button");
    dropdownBtn.addEventListener('click', () => {
        toggleDropdown();
    });

    function toggleDropdown() {
        let dropdown = document.getElementById("item-dropdown-content");
        dropdown.classList.toggle('show');
    }
    
    function handleItemClick(event) {
        let dataValue = event.currentTarget.getAttribute('data-value');
        console.log('Clicked item:', dataValue);
        addChampionItem(dataValue);
    }
    
    let doran = false;
    let unique = false;
    let boots = false;
    let championItems = [];
    
    function generateChampionItems() {
        for (let i = 0; i < 6; i++) {
            let item = document.getElementById(`item${i}`);
            item.addEventListener('click', () => {
                deleteChampionItem(i);
            });
        }
    }
    generateChampionItems();
    
    function updateChampionItems() {
        for (let i = 0; i < 6; i++) {
            let item = document.getElementById(`item${i}`);
            let itemName = championItems[i];
            if (itemName) {
                item.innerHTML = `<img src="Images/${itemName}.webp" alt="None" data-value="${itemName}">`;
            } else {
                item.innerHTML = '';
            }
        }
    }
    function deleteChampionItem(indexToDelete) {        
        championItems.splice(indexToDelete, 1);
        updateChampionItems();
    }
    function addChampionItem(itemName) {
        if(championItems.length >= 6) {
            window.alert("最多6個裝備");
            return;
        }
        getItemStatus(itemName);
        
    }
    
    function getItemStatus(itemName) {
        let testForm = new FormData();
        testForm.append("action", "getItemStatus");
        testForm.append("itemName", itemName);

        fetch("Controller/Api/ItemController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            
            championItems.push(itemName);
            updateChampionItems();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});