document.addEventListener('DOMContentLoaded', function() {   
    generateLevel();
    generateSkillLevel();
    generateChampionItems();
    
    getAllItems();
    getSelectedChampion();
    
    let selectedChampion;
    let championBase = {};
    let skillBase = {};
    let championStatus = {};
    let itemStatus = {
        hpOther: 0,
        mpOther: 0,
        adOtherValue: 18 * 0.6, // 2科小符文適性 18 * 0.6 1科物防
        apOtherValue: 0,
        arOtherValue: 6,
        mrOtherValue: 0,
        spdOtherValue: 0,
        hasteOther: 0
    };
    function generateLevel() {
        let levelSelect = document.getElementById('levelSelect');
        for (let level = 1; level <= 18; level++) {
            let option = document.createElement('option');
            option.innerHTML = level;
            levelSelect.add(option);
        }
        levelSelect.addEventListener('change', (event) => {
            updateChampionStatus(parseInt(event.target.value));
            ['Q', 'W', 'E', 'R'].forEach ((button) => {
                updateSkill(button);
            });
        });
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
                updateSkill(button);
            });
        });
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
    function generateChampionItems() {
        for (let i = 0; i < 6; i++) {
            let item = document.getElementById(`item${i}`);
            item.addEventListener('click', () => {
                deleteChampionItem(i);
            });
        }
    }
    
    let doran = 0;
    let unique = 0;
    let boots = 0;
    let championItems = [];
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
        let itemName = championItems[indexToDelete];
        championItems.splice(indexToDelete, 1);
        
        let testForm = new FormData();
        testForm.append("action", "getItemStatus");
        testForm.append("itemName", itemName);

        fetch("Controller/Api/ItemController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.json())
        .then(data => {
            itemStatus.hpOther -= data[1];
            itemStatus.mpOther -= data[2];
            itemStatus.adOtherValue -= data[3];
            itemStatus.apOtherValue -= data[4];
            itemStatus.arOtherValue -= data[5];
            itemStatus.mrOtherValue -= data[6];
            itemStatus.spdOtherValue -= data[7];
            itemStatus.hasteOther -= data[8];
            let uni  = data[9];
            let boo = data[10];
            let dor = data[11];
            unique = (unique === uni) ? 0 : 1;
            boots = (boots === boo) ? 0 : 1;
            doran = (doran === dor) ? 0 : 1;
            let level = parseInt(document.getElementById('levelSelect').value);
            updateChampionItems();
            updateChampionStatus(level);
            ['Q', 'W', 'E', 'R'].forEach ((button) => {
                updateSkill(button);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });     
    }
    function addChampionItem(itemName) {
        if(championItems.length >= 6) {
            window.alert("最多6個裝備");
            return;
        }
        
        let testForm = new FormData();
        testForm.append("action", "getItemStatus");
        testForm.append("itemName", itemName);

        fetch("Controller/Api/ItemController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.json())
        .then(data => {
            itemStatus.hpOther += data[1];
            itemStatus.mpOther += data[2];
            itemStatus.adOtherValue += data[3];
            itemStatus.apOtherValue += data[4];
            itemStatus.arOtherValue += data[5];
            itemStatus.mrOtherValue += data[6];
            itemStatus.spdOtherValue += data[7];
            itemStatus.hasteOther += data[8];
            let uni = data[9];
            let boo = data[10];
            let dor = data[11];
            let ret = judge (itemName, uni, boo, dor);
            if(ret === "ok") {
                championItems.push(itemName);
                unique = (unique === uni) ? 0 : 1;
                boots = (boots === boo) ? 0 : 1;
                doran = (doran === dor) ? 0 : 1;
                let level = parseInt(document.getElementById('levelSelect').value);
                updateChampionItems();
                updateChampionStatus(level);
                ['Q', 'W', 'E', 'R'].forEach ((button) => {
                    updateSkill(button);
                });
            } else {
                window.alert(ret);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });      
    }
    function judge(itemName, uni, boo, dor) {
        if (championItems.includes(itemName))   return "已經有這件裝備了";
        if (uni === 1 && unique === 1)  return "只有有一件傳奇裝備";
        if (boo === 1 && boots === 1)  return "只有有一雙鞋子";
        if (dor === 1 && doran === 1)  return "只有有一把多蘭裝備";
        return "ok";
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
            championBase = {
                hpBase: data[1],
                hpBonus: data[2],
                mpBase: data[3],
                mpBonus: data[4],
                adBase: data[5],
                adBonus: data[6],
                apBase: 0,
                apBonus: 0,
                arBase: data[7],
                arBonus: data[8],
                mrBase: data[9],
                mrBonus: data[10],
                spdBase: data[11],
                spdBonus: 0,
                hasteBase: 0,
                hasteBonus: 0
            };
            updateChampionStatus(1);
            getChampionSkills();
        })
        .catch(error => {
            console.error('Error fetching champion status:', error);
        });
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
                let skillImg = document.getElementById('skillImg' + (index + 1));
                let buttonElement = document.getElementById('button' + (index + 1));
                let skillName = document.getElementById('skillName' + (index + 1));
                let dmgType = document.getElementById('dmgType' + (index + 1));

                buttonElement.innerHTML = data[12];
                skillName.innerHTML = data[13];
                skillImg.src = "Images/" + data[13] + '.webp';
                dmgType.innerHTML = data[26];
                let button = data[12];
                skillBase[button] = {
                    baseSkill: data[14],
                    bonusSkill: data[15],
                    adBaseSkill: data[16],
                    adBonusSkill: data[17],
                    apBaseSkill: data[18],
                    apBonusSkill: data[19],
                    adOtherBase: data[20],
                    adOtherBonus: data[21],
                    apOtherBase: data[22],
                    apOtherBonus: data[23],
                    cdBase: data[24],
                    cdBonus: data[25]
                };
            } catch (error) {
                console.error('Error fetching champion status:', error);
            }
        }));
        ['Q', 'W', 'E', 'R'].forEach ((button) => {
            updateSkill(button);
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
            generateItems(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    function updateChampionStatus(level) {
        console.log(level);
        let hpStatus = calAttribute(championBase.hpBase, itemStatus.hpOther, championBase.hpBonus, level);
        let mpStatus = calAttribute(championBase.mpBase, itemStatus.mpOther, championBase.mpBonus, level);
        let adStatus = calAttribute(championBase.adBase, itemStatus.adOtherValue, championBase.adBonus, level);
        let apStatus = calAttribute(championBase.apBase, itemStatus.apOtherValue, championBase.apBonus, level);
        let arStatus = calAttribute(championBase.arBase, itemStatus.arOtherValue, championBase.arBonus, level);
        let mrStatus = calAttribute(championBase.mrBase, itemStatus.mrOtherValue, championBase.mrBonus, level);
        let spdStatus = calAttribute(championBase.spdBase, itemStatus.spdOtherValue, championBase.spdBonus, level);
        let hasteStatus = calAttribute(championBase.hasteBase, itemStatus.hasteOther, championBase.hasteBonus, level);
        championStatus = {
            hpStatus, mpStatus, adStatus, apStatus, arStatus, mrStatus, spdStatus, hasteStatus
        };
        updateChampionTable();
    }
    function calAttribute(base, other, bonus, level) {
        base = parseFloat(base);
        other = parseFloat(other);
        bonus = parseFloat(bonus);
        return Math.round(base + other + bonus * (level - 1) * (0.7025 + 0.0175 * (level - 1)));
    } 
    function updateChampionTable() {
        let ch = championStatus;
        let it = itemStatus;
        let hpValue = document.getElementById('hpValue');
        let mpValue = document.getElementById('mpValue');
        let adValue = document.getElementById('adValue');
        let apValue = document.getElementById('apValue');
        let arValue = document.getElementById('arValue');
        let mrValue = document.getElementById('mrValue');
        let spdValue = document.getElementById('spdValue');
        let hasteValue = document.getElementById('hasteValue');
        
        hpValue.innerHTML = ch.hpStatus.toString();
        mpValue.innerHTML = ch.mpStatus.toString();
        adValue.innerHTML = ch.adStatus.toString();
        apValue.innerHTML = ch.apStatus.toString();
        arValue.innerHTML = ch.arStatus.toString();
        mrValue.innerHTML = ch.mrStatus.toString();
        spdValue.innerHTML = ch.spdStatus.toString();
        hasteValue.innerHTML = ch.hasteStatus.toString();
    }

    const buttonToIndex = {
        'Q': 1,
        'W': 2,
        'E': 3,
        'R': 4
    };
    function updateSkill(button) {
        let index = buttonToIndex[button];
        let skillSelect = document.getElementById('skillSelect' + index);
        let level = parseInt(skillSelect.value);
        let dmg = document.getElementById('dmg' + index);
        dmg.innerHTML = calSkill(button, level).toString();
        let cd = document.getElementById('cd' + index);
        cd.innerHTML = calCD(button, level).toString();
    }   
    function calSkill(button, level) {
        let sk = skillBase[button];
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
        
        let adStatus = parseFloat(championStatus.adStatus);
        let apStatus = parseFloat(championStatus.apStatus);
        
        let adOtherValue = parseFloat(itemStatus.adOtherValue);
        let apOtherValue = parseFloat(itemStatus.apOtherValue);
        
        return Math.round(baseT + adT * adStatus + apT * apStatus + adOtherT * adOtherValue + apOtherT * apOtherValue);
//        return Math.ceil(baseT + adT * adStatus + apT * apStatus);
    }
    function calCD(button, level) {
        let sk = skillBase[button];
        let cdBase = parseFloat(sk.cdBase);
        let cdBonus = parseFloat(sk.cdBonus);
        let haste = parseFloat(championStatus.hasteStatus);
        let reduction = haste / (haste + 100) ; 
        let cdT = ((cdBase + cdBonus * (level - 1)) * (1 - reduction)).toFixed(2);
        return cdT;
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
});