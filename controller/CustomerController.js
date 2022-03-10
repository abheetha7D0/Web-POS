function loadAllCustomers() {
    $("#customerTable").empty();
    for (var i of customerDB) {
        let row = `<tr><td>${i.getCustomerID()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerSalary()}</td></tr>`;
        $("#customerTable").append(row);
        $("#customerTable>tr").click(function () {
            $('#inputSearchCus').val($(this).children(":eq(0)").text())

            $('#inputUId').val($(this).children(":eq(0)").text())
            $('#inputUCustomerName').val($(this).children(":eq(1)").text())
            $('#inputUAddress').val($(this).children(":eq(2)").text())
            $('#inputUSalary').val($(this).children(":eq(3)").text())
        })
    }
}

function saveCustomer() {
    var id = $("#inputCusId").val();
    var name = $("#inputCustomerName").val();
    var address = $("#inputCusAddress").val();
    var salary = $("#inputCusSalary").val();

    customerDB.push(new CustomerDTO(id, name, address, salary));
}

function deleteCustomer(id) {
    let customer;
    if (id != null) {
        for (var i = 0; i < customerDB.length; i++) {
            if (id == customerDB[i].getCustomerID()) {
                customer = customerDB[i];
            }
        }
        let indexNumber = customerDB.indexOf(customer);
        customerDB.splice(indexNumber, 1);
        return true;
    } else {
        return false;
    }
}

function updateCustomer() {
    let customerID = $('#inputUId').val();
    let customerName = $("#inputUCustomerName").val();
    let customerAddress = $("#inputUAddress").val();
    let customerSalary = $("#inputUSalary").val();
    for (var i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerID() == $("#inputUId").val()) {
            var customer = customerDB[i];
            customer.setCustomerName(customerName);
            customer.setCustomerAddress(customerAddress);
            customer.setCustomeSalary(customerSalary)
        }
    }
}

function searchCustomer() {

    $("#customerTable").empty()
    let cus;
    for (var i = 0; i < customerDB.length; i++) {
        if ($('#inputSearchCus').val() == customerDB[i].getCustomerID()) {
            cus = customerDB[i];
            let row = `<tr><td>${cus.getCustomerID()}</td><td>${cus.getCustomerName()}</td><td>${cus.getCustomerAddress()}</td><td>${cus.getCustomerSalary()}</td></tr>`;
            $("#customerTable").append(row);
        }
    }
}

$("#btnCusSave").click(function () {

    saveCustomer();

    loadAllCustomers();
    $("#inputCusId,#inputCustomerName,#inputCusAddress,#inputCusSalary").val("");
});

$("#btnCusDelete").click(function () {
    let id = $('#inputSearchCus').val();
    let option = confirm(`Do you want to delete ID:${id}`);
    if (option) {
        let erase = deleteCustomer(id);
        if (erase) {
            alert("Customer Deleted");
            $('#inputCusID,#inputCusName,#inputCusAddress,#inputCusSalary').val("");
        } else {
            alert("Delete Failed , Try again");
        }
    }

    loadAllCustomers();
    $('#inputSearchCus').val("");
});

$("#btnCusUpdate").click(function () {
    updateCustomer();
    loadAllCustomers();
    $('#inputCusID,#inputCusName,#inputCusAddress,#inputCusSalary').val("");
});

$("#btnCusSearch").click(function () {
    searchCustomer();
});
$("#btnGetAllCus").click(function () {
    loadAllCustomers();
    $('#inputSearchCus').val("");
});