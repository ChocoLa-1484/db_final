<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <script src="Assets/JS/item_modify.js"></script>
        <title>Modify item</title>
        <link rel="shortcut icon" href="#">
        <link rel="stylesheet" href="Assets/CSS/item_modify.css">
    </head>
    <body background="Images/Shop interface.webp">
        <div class="topnav">
            <a href="index.php">Choose champion</a>
            <a href="item_modify.php">Modify items</a>
            <a href="item_add.php">Add items</a>
        </div>

        <div class="itemInfo">
            <table border="1" id="itemInfo">
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
            </table>
        <div>

        <input type="button" value="Modify" id="modifyButton">
        <br><br>
        <input type="button" value="Delete" id="deleteButton">
    </body>
</html>