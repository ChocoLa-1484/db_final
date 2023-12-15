<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Main Page</title>
    <script src="Assets/JS/main.js"></script>
</head>
<body>
    <div id="selectedChampion"></div>
    <img id="selectedChampionImg" alt="None"/></img>
    
     <!-- 表格顯示冠軍屬性 -->
    <h2>Champion Attributes</h2>
    <table border="1">
        <tr>
            <th>Level</th>
            <td>
                <select id="levelSelect"></select>
            </td>
        </tr>
        <tr>
            <th>HP</th>
            <td id="hpValue"></td>
        </tr>
        <tr>
            <th>MP</th>
            <td id="mpValue"></td>
        </tr>
        <tr>
            <th>AD</th>
            <td id="adValue"></td>
        </tr>
        <tr>
            <th>AP</th>
            <td id="apValue"></td>
        </tr>
        <tr>
            <th>AR</th>
            <td id="arValue"></td>
        </tr>
        <tr>
            <th>MR</th>
            <td id="mrValue"></td>
        </tr>
        <tr>
            <th>SPD</th>
            <td id="spdValue"></td>
        </tr>
        <tr>
            <th>Haste</th>
            <td id="hasteValue"></td>
        </tr>
    </table>
    
    <!-- 表格顯示技能 -->
    <h2>Skills</h2>
    <table border="1" id="skillsTable">
        <tr>
            <th>Skill Img</th>
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
    
    <table border="1">
        <tr>
          <td id="item1"></td>
          <td id="item2"></td>
          <td id="item3"></td>
        </tr>
        <tr>
          <td id="item4"></td>
          <td id="item5"></td>
          <td id="item6"></td>
        </tr>
    </table>
</body>
</html>
