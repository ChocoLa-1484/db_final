<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <script src="Assets/JS/item_add.js"></script>
        <title>Add item</title>
        <link rel="shortcut icon" href="#">
        <link rel="stylesheet" href="Assets/CSS/item_add.css">
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
                    <th>ItemIcon</th>
                    <th>ItemName</th>
                    <th>HP</th>      
                    <th>MP</th>         
                    <th>AD</th>     
                    <th>AP</th>
                    <th>AR</th>
                    <th>MR</th>
                    <th>SPD</th>
                    <th>Haste</th>
                    <th>Unique</th>
                    <th>Boots</th>
                    <th>Doran</th>
                </tr>
                <tr>
                <form id="itemForm">
                    <td><input type="file" name="itemImage" id="itemImage" accept="image/*"></td>
                    <td><input name="itemName" type="text" id="itemName"></td>
                    <td><input name="hp" type="number" id="hp"></td>      
                    <td><input name="mp" type="number" id="mp"></td>         
                    <td><input name="ad" type="number" id="ad"></td>     
                    <td><input name="ap" type="number" id="ap"></td>
                    <td><input name="ar" type="number" id="ar"></td>
                    <td><input name="mr" type="number" id="mr"></td>
                    <td><input name="spd" type="number" id="spd"></td>
                    <td><input name="haste" type="number" id="haste"></td>
                    <td><input name="unique" type="number" id="unique"></td>
                    <td><input name="boots" type="number" id="boots"></td>
                    <td><input name="doran" type="number" id="doran"></td>
                </form>
                </tr>
            </table>
        </div>
        <input type="button" value="Add" id="addButton">
    </body>
</html>