
document.addEventListener('DOMContentLoaded', () => { 
    let itemForm = document.getElementById('itemForm');
    let addButton = document.getElementById('addButton');
    addButton.addEventListener('click', addItem);
    function addItem() {
        let testForm = new FormData(itemForm);
        testForm.append("action", "addItem");
        fetch("Controller/Api/itemController.php", {
            method: "POST",
            body: testForm
        })
        .then(response => response.text())
        .then(data => {
            window.alert(data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});