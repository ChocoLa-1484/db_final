<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Champion information</title>
        <script src="Assets/JS/main.js"></script>
        <link rel="stylesheet" href="Assets/CSS/main.css">
    </head>
    <body background="Images/Shop.jpg">
        <div class="topnav">
            <a href="index.php">Choose champion</a>
            <a href="item_modify.php">Modify items</a>
            <a href="item_add.php">Add items</a>
            <a href="skill_add.php">Add skills</a>
        </div>

        <div id="leftPanel" class="panel">
            <div class="champion-panel">
                <h1 id="selectedChampion"></h1>
                <img id="selectedChampionImg" alt="None"></img>        
            </div>    
    
            <div class="champion-panel">
                <table border="1">
                    <tr>
                        <th>Level</th>
                        <th>HP</th>      
                        <th>MP</th>         
                        <th>AD</th>     
                        <th>AP</th>
                        <th>AR</th>
                        <th>MR</th>
                        <th>SPD</th>
                        <th>Haste</th>
                    </tr>
                    <tr>
                        <td>
                            <select id="levelSelect"></select>
                        </td>
                        <td id="hpValue"></td>                    
                        <td id="mpValue"></td>
                        <td id="adValue"></td>
                        <td id="apValue"></td>
                        <td id="arValue"></td>
                        <td id="mrValue"></td>
                        <td id="spdValue"></td>
                        <td id="hasteValue"></td>
                    </tr>
                </table>
            </div>    
            <br><br><br>
            <table border="1" id="skillsTable">
                <tr>
                    <th>Skill Icon</th>
                    <th>Button</th>
                    <th>Skill Name</th>
                    <th>Damage</th>
                    <th>Cool Down</th>
                    <th>Dmg Type</th>
                    <th>Level</th>
                </tr>
                <tr>
                    <td><img id="skillImg1" alt="None"></td>
                    <td id="button1"></td>
                    <td id="skillName1"></td>
                    <td id="dmg1"></td>
                    <td id="cd1"></td>
                    <td id="dmgType1"></td>
                    <td>
                        <select id="skillSelect1"></select>
                    </td>
                </tr>
                <tr>
                    <td><img id="skillImg2" alt="None"></td>
                    <td id="button2"></td>
                    <td id="skillName2"></td>
                    <td id="dmg2"></td>
                    <td id="cd2"></td>
                    <td id="dmgType2"></td>
                    <td>
                        <select id="skillSelect2"></select>
                    </td>
                </tr>
                <tr>
                    <td><img id="skillImg3" alt="None"></td>
                    <td id="button3"></td>
                    <td id="skillName3"></td>
                    <td id="dmg3"></td>
                    <td id="cd3"></td>
                    <td id="dmgType3"></td>
                    <td>
                        <select id="skillSelect3"></select>
                    </td>
                </tr>
                <tr>
                    <td><img id="skillImg4" alt="None"></td>
                    <td id="button4"></td>
                    <td id="skillName4"></td>
                    <td id="dmg4"></td>
                    <td id="cd4"></td>
                    <td id="dmgType4"></td>
                    <td>
                        <select id="skillSelect4"></select>
                    </td>
                </tr>
            </table>
        </div>

        <div id="rightPanel" class="panel">
            <h1>Items</h1>
            <table border="1">
                <tr>
                    <td class="item" id="item0"></td>
                    <td class="item" id="item1"></td>
                    <td class="item" id="item2"></td>
                </tr>
                <tr>
                    <td class="item" id="item3"></td>
                    <td class="item" id="item4"></td>
                    <td class="item" id="item5"></td>
                </tr>
            </table>
            <br>
            <button class="dropdown-button" id="item-dropdown-button">Select Items</button>
            <div class="dropdown-content" id="item-dropdown-content"></div>
        </div>

    </body>
</html>