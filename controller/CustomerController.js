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

function searchCustomerFromID(typedCustomerID) {
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].id == id) {
            return customerDB[i];
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

//validation started
// customer regular expressions
const cusIDRegEx = /^(C00-)[0-9]{1,3}$/;
const cusNameRegEx = /^[A-z ]{2,20}$/;
const cusAddressRegEx = /^[0-9/A-z. ,]{7,}$/;
const cusSalaryRegEx = /^[0-9]{1,}[.]?[0-9]{1,2}$/;


$('#inputCusID,#inputCusName,#inputCusAddress,#inputCusSalary').on('keydown', function (eventOb) {
    if (eventOb.key == "Tab") {
        eventOb.preventDefault(); // stop execution of the button
    }
});

$('#inputCusID,#inputCusName,#inputCusAddress,#inputCusSalary').on('blur', function () {
    formValid();
});

$("#inputCusID").on('keyup', function (eventOb) {
    setButton();

});

$("#inputCusName").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#inputCusAddress").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});

$("#inputCusSalary").on('keyup', function (eventOb) {
    setButton();
    if (eventOb.key == "Enter") {
        checkIfCustValid();
    }
});
// focusing events end
$("#btnCusSave").attr('disabled', true);

function clearAll() {
    $('#inputCusID,#inputCusName,#inputCusAddress,#inputCusSalary').val("");
    $('#inputCusID,#inputCusName,#inputCusAddress,#inputCusSalary').css('border', '2px solid #ced4da');
    $('#inputCusName').focus();
    $("#btnCusSave").attr('disabled', true);
    loadAllCustomers();
    $("#lblCusId,#lblCusName,#lblCusAddress,#lblCusSalary").text("");

}

function formValid() {
    var cusID = $("#inputCusID").val();
    $("#inputCusID").css('border', '2px solid green');
    $("#lblCusId").text("");
    if (cusIDRegEx.test(cusID)) {
        var cusName = $("#inputCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#inputCusName").css('border', '2px solid green');
            $("#lblCusName").text("");
            var cusAddress = $("#inputCusAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                var cusSalary = $("#inputCusSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                $("#inputCusAddress").css('border', '2px solid green');
                $("#lblCusAddress").text("");
                if (resp) {
                    $("#inputCusSalary").css('border', '2px solid green');
                    $("#lblCusSalary").text("");
                    return true;
                } else {
                    $("#inputCusSalary").css('border', '2px solid red');
                    $("#lblCusSalary").text("Cus Salary is a required field : Pattern 100.00 or 100");
                    return false;
                }
            } else {
                $("#inputCusAddress").css('border', '2px solid red');
                $("#lblCusAddress").text("Cus Name is a required field : Mimum 7");
                return false;
            }
        } else {
            $("#inputCusName").css('border', '2px solid red');
            $("#lblCusName").text("Cus Name is a required field : Mimimum 5, Max 20, Spaces Allowed");
            return false;
        }
    } else {
        $("#inputCusID").css('border', '2px solid red');
        $("#lblCusId").text("Cus ID is a required field : Pattern C00-000");
        return false;
    }
}

function checkIfValid() {
    var cusID = $("#inputCusID").val();
    if (cusIDRegEx.test(cusID)) {
        $("#inputCusName").focus();
        var cusName = $("#inputCusName").val();
        if (cusNameRegEx.test(cusName)) {
            $("#inputCusAddress").focus();
            var cusAddress = $("#inputCusAddress").val();
            if (cusAddressRegEx.test(cusAddress)) {
                $("#inputCusSalary").focus();
                var cusSalary = $("#inputCusSalary").val();
                var resp = cusSalaryRegEx.test(cusSalary);
                if (resp) {
                    let res = confirm("Do you really need to add this Customer..?");
                    if (res) {
                        saveCustomer();
                        clearAll();
                    }
                } else {
                    $("#inputCusSalary").focus();
                }
            } else {
                $("#inputCusAddress").focus();
            }
        } else {
            $("#inputCusName").focus();
        }
    } else {
        $("#inputCusID").focus();
    }
}

function setButton() {
    let b = formValid();
    if (b) {
        $("#btnCusSave").attr('disabled', false);
    } else {
        $("#btnCusSave").attr('disabled', true);
    }
}

$('#btnCusSave').click(function () {
    checkIfValid();
});