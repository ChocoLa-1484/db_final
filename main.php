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
            <th>AR</th>
            <td id="arValue"></td>
        </tr>
        <tr>
            <th>MR</th>
            <td id="mrValue"></td>
        </tr>
    </table>
    
    <!-- 表格顯示技能 -->
    <h2>Skills</h2>
    <table border="1" id="skillsTable">
        <tr>
            <th>Skill Name</th>
            <th>Damage</th>
        </tr>
        <!-- 這裡使用 JavaScript 動態添加技能行 -->
    </table>
</body>
</html>
