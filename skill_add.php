<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <script src="Assets/JS/skill_add.js"></script>
        <title>Add skill</title>
        <link rel="shortcut icon" href="#">
        <link rel="stylesheet" href="Assets/CSS/skill_add.css">
    </head>
    <body background="Images/Shop2.jpg">
        <div class="topnav">
            <a href="index.php">Choose champion</a>
            <a href="item_modify.php">Modify items</a>
            <a href="item_add.php">Add items</a>
            <a href="skill_add.php">Add skills</a>
        </div>

        <div class="itemInfo">
            <table border="1">
                <tr>
                    <th>Champion Name</th>
                    <th>Button</th>
                    <th>Skill Name</th>      
                    <th>Base</th>         
                    <th>Base Bonus</th>     
                    <th>AD</th>
                    <th>AD Bonus</th>
                    <th>AP</th>
                    <th>AP Bonus</th>
                    <th>AD Other Base</th>
                    <th>AD Other Bonus</th>
                    <th>AP Other Base</th>
                    <th>AP Other Bonus</th>
                    <th>CD</th>
                    <th>CD Bonus</th>
                    <th>DMG type</th>
                </tr>
                <tr>
                <form id="skillForm">
                    <td id="ChampionName"></td>
                    <td><input type="text" name="button"></td>
                    <td><input type="text" name="skillName"></td>
                    <td><input type="number" name="base"></td>      
                    <td><input type="number" name="baseBonus"></td>         
                    <td><input type="number" name="ad"></td>     
                    <td><input type="number" name="adBonus"></td>
                    <td><input type="number" name="ap"></td>
                    <td><input type="number" name="apBonus"></td>
                    <td><input type="number" name="adOtherBase"></td>
                    <td><input type="number" name="adOtherBonus"></td>
                    <td><input type="number" name="apOtherBase"></td>
                    <td><input type="number" name="apOtherBonus"></td>
                    <td><input type="number" name="cd"></td>
                    <td><input type="number" name="cdBonus"></td>
                    <td><input type="text" name="dmgType"></td>
                </form>
                </tr>
            </table>
        </div>

        <input type="button" value="Add" id="addButton">     
    </body>
</html>