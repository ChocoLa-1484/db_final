<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <script src="Assets/JS/item_add.js"></script>
        <title>Add item</title>
        <link rel="shortcut icon" href="#">
        <link rel="stylesheet" href="Assets/CSS/item_add.css">
    </head>
    <body background="Images/Shop interface.webp">
        <div class="topnav">
            <a href="index.php">Choose champion</a>
            <a href="item_modify.php">Modify items</a>
            <a href="item_add.php">Add items</a>
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
                    <td><input type="file" id="itemIcon" accept="image/jpeg, image/png"></td>
                    <td><input type="text" id="itemName"></td>
                    <td><input type="number" id="hp"></td>      
                    <td><input type="number" id="mp"></td>         
                    <td><input type="number" id="ad"></td>     
                    <td><input type="number" id="ap"></td>
                    <td><input type="number" id="ar"></td>
                    <td><input type="number" id="mr"></td>
                    <td><input type="number" id="spd"></td>
                    <td><input type="number" id="haste"></td>
                    <td><input type="number" id="unique"></td>
                    <td><input type="number" id="boots"></td>
                    <td><input type="number" id="doran"></td>
                </tr>
            </table>
        </div>

        <input type="button" value="Add" id="addButton">     
    </body>
</html>