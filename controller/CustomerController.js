function loadAllCustomers() {
    $("#customerTable").empty();
    for (var i of customerDB) {
        let row = `<tr><td>${i.getCustomerID()}</td><td>${i.getCustomerName()}</td><td>${i.getCustomerAddress()}</td><td>${i.getCustomerSalary()}</td></tr>`;
        $("#customerTable").append(row);
    }
}

function saveCustomer() {
    var id = $("#inputCusId").val();
    var name = $("#inputCustomerName").val();
    var address = $("#inputCusAddress").val();
    var salary = $("#inputCusSalary").val();

    customerDB.push(new CustomerDTO(id, name, address, salary));
}

function deleteCustomer() {

}

function updateCustomer() {

}

function searchCustomer(id) {

}


$("#btnCusSave").click(function () {

    saveCustomer();

    loadAllCustomers();
    $("#inputCusId,#inputCustomerName,#inputCusAddress,#inputCusSalary").val("");
});
