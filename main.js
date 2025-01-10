let selectedRow = null;

// Fetch and display the list of flights
function fetchFlightList() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "http://127.0.0.1:4300/flight/get", true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            const flights = JSON.parse(xhr.responseText);
            const table = document.getElementById("Flightlist").getElementsByTagName('tbody')[0];
            table.innerHTML = ""; // Clear existing rows
            flights.forEach(insertNewRecord);
        }
    };
    xhr.send();
}

// Insert a new record in the table
function insertNewRecord(data) {
    const table = document.getElementById("Flightlist").getElementsByTagName('tbody')[0];
    const newRow = table.insertRow(table.length);

    newRow.insertCell(0).innerHTML = data.Full_Name;
    newRow.insertCell(1).innerHTML = data.Flight_Name;
    newRow.insertCell(2).innerHTML = data.Price;
    newRow.insertCell(3).innerHTML = data.Boarding_City;
    newRow.insertCell(4).innerHTML = data.Destination_City;
    newRow.insertCell(5).innerHTML = data.Seat;
    newRow.insertCell(6).innerHTML = `<a onClick="onEdit(this)">Edit</a> 
                                       <a onClick="onDelete(this)">Delete</a>`;
}

// Send POST request to add new flight booking
function xhrFunction() {
    const data = readFormData();
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "http://127.0.0.1:4300/flight/create", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(data));
    xhr.onload = function() {
        if (xhr.status === 200) {
            fetchFlightList();
            resetForm();


        }
    };
}

// Send PUT request to update existing flight booking
function updateRecordOnServer(formData) {
    const xhr = new XMLHttpRequest();
    xhr.open("PUT", `http://127.0.0.1:4300/flight/update/${formData.Full_Name}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(JSON.stringify(formData));
    xhr.onload = function() {
        if (xhr.status === 200) {
            fetchFlightList();
            resetForm();
        }
    };
}

// Handle form submission
function onFormSubmit() {
    if (validate()) {
        const formData = readFormData();
        if (selectedRow == null) {
            xhrFunction(); // POST request for new entry
        } else {
            updateRecordOnServer(formData); // PUT request for update
        }
    }
}

// Read data from the form
function readFormData() {
    return {
        Full_Name: document.getElementById("fullname").value,
        Flight_Name: document.getElementById("flight").value,
        Price: document.getElementById("price").value,
        Boarding_City: document.getElementById("boradingcity").value,
        Destination_City: document.getElementById("destinationcity").value,
        Seat: document.getElementById("seat").value,
    };
}

// Reset form fields
function resetForm() {
    document.getElementById("fullname").value = "";
    document.getElementById("flight").value = "";
    document.getElementById("price").value = "";
    document.getElementById("boradingcity").value = "";
    document.getElementById("destinationcity").value = "";
    document.getElementById("seat").value = "";
    selectedRow = null;
}

// Validate form data
function validate() {
    let isValid = true;
    if (document.getElementById("fullname").value == "") {
        isValid = false;
        document.getElementById("FlightValidationError").classList.remove("hide");
    } else {
        document.getElementById("FlightValidationError").classList.add("hide");
    }
    return isValid;
}

// Edit an existing row
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("fullname").value = selectedRow.cells[0].innerHTML;
    document.getElementById("flight").value = selectedRow.cells[1].innerHTML;
    document.getElementById("price").value = selectedRow.cells[2].innerHTML;
    document.getElementById("boradingcity").value = selectedRow.cells[3].innerHTML;
    document.getElementById("destinationcity").value = selectedRow.cells[4].innerHTML;
    document.getElementById("seat").value = selectedRow.cells[5].innerHTML;
}

// Delete a record from server and table
function deleteRecordOnServer(Full_Name) {
    const xhr = new XMLHttpRequest();
    console.log(Full_Name);
    xhr.open("DELETE", `http://127.0.0.1:4300/flight/delete/${Full_Name}`, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    
    // Send Full_Name in the request body as JSON
    xhr.onload = function() {
        if (xhr.status === 200) {
            fetchFlightList();
        }
    };
    
    // Send Full_Name as a JSON object in the body
    xhr.send();
}


function onDelete(td) {
    if (confirm('Are you sure to delete this record?')) {
        const row = td.parentElement.parentElement;
        const fullName = row.cells[0].innerHTML;
        deleteRecordOnServer(fullName);
        document.getElementById("Flightlist").deleteRow(row.rowIndex);
        resetForm();
    }
}

// Fetch the flight list when the page loads
window.onload = fetchFlightList;
