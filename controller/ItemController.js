function loadAllItems() {
    $("#itemTable").empty();
    for (var i of itemDB) {
        let row = `<tr><td>${i.getItemCode()}</td><td>${i.getItemName()}</td><td>${i.getItemQTY()}</td><td>${i.getUnitPrice()}</td></tr>`;
        $("#itemTable").append(row);
        $("#itemTable>tr").click(function () {
            $('#btnSearchItem').val($(this).children(":eq(0)").text())

            $('#inputUCode').val($(this).children(":eq(0)").text())
            $('#inputUName').val($(this).children(":eq(1)").text())
            $('#inputUPrice').val($(this).children(":eq(2)").text())
            $('#inputUQuantity').val($(this).children(":eq(3)").text())
        })
    }
}

function saveItem() {
    var code = $("#inputCode").val();
    var name = $("#inputItemName").val();
    var price = $("#inputPrice").val();
    var quantity = $("#inputQuantity").val();
    itemDB.push(new ItemDTO(code, name, price, quantity));
}

function deleteItem(code) {
    let item;
    if (code != null) {
        for (var i = 0; i < itemDB.length; i++) {
            if (item == itemDB[i].getItemCode()) {
                item = itemDB[i];
            }
        }
        let indexNumber = itemDB.indexOf(item);
        itemDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

function updateItem() {
    let code = $('#inputUCode').val();
    let Name = $("#inputUName").val();
    let price = $("#inputUPrice").val();
    let quantity = $("#inputUQuantity").val();
    for (var i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode() == $("#inputCode").val()) {
            var item = itemDB[i];
            item.setItemName(Name);
            item.setItemQTY(price);
            item.setUnitPrice(quantity)
        }
    }
}

function searchItem() {

    $("#itemTable").empty()
    let item;
    for (var i = 0; i < itemDB.length; i++) {
        if ($('#btnSearchItem').val() == itemDB[i].getItemCode()) {
            item = itemDB[i];
            let row = `<tr><td>${item.getItemCode()}</td><td>${item.getItemName()}</td><td>${item.getItemQTY()}</td><td>${item.getUnitPrice()}</td></tr>`;
            $("#itemTable").append(row);
        }
    }
}

$("#btnItemSave").click(function () {

    saveItem();
    loadAllItems();
    $("#inputCode,#inputItemName,#inputPrice,#inputQuantity").val("");
});

$("#btnItemDelete").click(function () {
    let code = $('#btnSearchItem').val();
    let option = confirm(`Do you want to delete ID:${code}`);
    if (option) {
        let erase = deleteItem(code);
        if (erase) {
            alert("Customer Deleted");
            $('#inputCode,#inputName,#inputPrice,#inputQuantity').val("");
        } else {
            alert("Delete Failed , Try again");
        }
    }
    loadAllItems();
    $('#btnItemSearch').val("");
});

$("#btnItemUpdate").click(function () {
    updateItem();
    loadAllItems();
    $('#inputCode,#inputName,#inputPrice,#inputQuantity').val("");
});

$("#btnItemSearch").click(function () {
    searchItem();
});

$("#btnGetAllItem").click(function () {
    loadAllItems();
    $('#btnItemSearch').val("");
});