class Transaction {
    //Each transaction has date (detailed), expense of item, purpose for purchase, and how necessary the item was (scale from 1-3)
    constructor(date, expense, purpose, necessity) {
        var mydate = new Date(date);
        this.month = mydate.getUTCMonth() + 1;
        this.date = mydate.getUTCDate();
        this.year = mydate.getUTCFullYear();
        this.expense = parseFloat(expense);
        this.purpose = purpose;
        this.necessity = parseInt(necessity, 10);
    }
    checkValidity() {
        if(this.month > 0 && this.month <= 12) {
            if (this.date > 0 && this.date <= 31) {
                return true; //for valid date before adding row
            }
        }
        return false;
    }
    //Preparing class variables for SQL Input
    SQLInput(month, date, year, expense, purpose, necessity) {
        this.month = parseInt(month, 10);
        this.date = parseInt(date, 10);
        this.year = parseInt(year, 10);
        this.expense = parseFloat(expense);
        this.purpose = purpose;
        this.necessity = parseInt(necessity, 10);
    }
}

function submitAll() {
    var date = document.getElementById("enterDate").value; //STRING
    var expense = document.getElementById("enterExpense").value; //NUMBER - FLOAT
    var purpose = document.getElementById("enterPurpose").value; //STRING
    var necessity = document.getElementById("enterNecessity").value; //NUMBER - INT

    newTransaction = new Transaction(date, expense, purpose, necessity);

    if(!date || !expense || !purpose || !necessity) {
        alert("Enter Text Please"); //Locks out incomplete entries
    }

    if(date && expense && purpose && necessity) {
        addRow(newTransaction); //Adds to TABLE only
        //Add to SQL/Firebase
    }

    //Clears out text fields for re-entry
    document.getElementById("enterDate").value = '';
    document.getElementById("enterExpense").value = '';
    document.getElementById("enterPurpose").value = '';
    document.getElementById("enterNecessity").value = '';
}

//WIP - Dropdown Menu Selector Input Reception
/*function getSelectedValue() {
    var e = document.getElementById("selectDate");
    var date = e.options[e.selectedIndex].value;
}*/

function addRow(transaction) {
    //Get Table
    var table = document.getElementById("tabularData");

    //New <tr> Row
    var row = table.insertRow(-1);

    //New <td> Cells
    var tableMonth = row.insertCell(0);
    var tableDate = row.insertCell(1);
    var tableYear = row.insertCell(2);
    var tableExpense = row.insertCell(3);
    var tablePurpose = row.insertCell(4);
    var tableNecessity = row.insertCell(5);

    //Add Text
    tableMonth.innerHTML = transaction.month;
    tableDate.innerHTML = transaction.date;
    tableYear.innerHTML = transaction.year;
    tableExpense.innerHTML = transaction.expense;
    tablePurpose.innerHTML = transaction.purpose;
    tableNecessity.innerHTML = transaction.necessity;
}

//NOTE: This is switching to Firebase soon
function connect() {    
    var db = openDatabase('optictransactions', '1.0', 'Optic Database', 2 * 1024 * 1024);
    
    db.transaction(function (tx) {
        /*tx.executeSql('CREATE TABLE IF NOT EXISTS AugustLol (Month int, Date int, Year int, Expense float, Purpose text, Necessity int)');
        tx.executeSql('INSERT INTO foo (Month, Date, Year, Expense, Purpose, Necessity) VALUES (8, 23, 2019, 41.23, "Lehigh Hoodie", 1)');
        tx.executeSql('INSERT INTO foo (id, text) VALUES (?, ?)', [2, "sySergies"]);
        tx.executeSql('SELECT * FROM foo', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
              alert(results.rows.item(i).text);
            }
          });
        tx.executeSql('SELECT * FROM AugustLol', [], function (tx, results) {
            var i;
            for (i = 0; i < results.rows.length; i++) {
                //newTransaction = new Transaction(results.rows.item(i).Month, expense, purpose, necessity);
                alert(results.rows.item(i).text);
            }
        });
        tx.executeSql('CREATE TABLE IF NOT EXISTS foo (id unique, name text)');*/
        tx.executeSql('CREATE TABLE IF NOT EXISTS Persons (PersonID int, LastName varchar(255), FirstName text)');
        tx.executeSql('INSERT INTO Persons (LastName, FirstName) VALUES ("Nair", "Advaith")');
        tx.executeSql('INSERT INTO Persons (LastName, FirstName) VALUES (?, ?)', ["Nair1", "Advaith1"]);
    });

    //Read SQL Rows
    db.transaction(function (tx){
        tx.executeSql('SELECT * FROM Persons', [], function (tx, results) {
            var len = results.rows.length, i;
            for (i = 0; i < len; i++) {
              alert(results.rows.item(i).FirstName);
            }
          });
    });
    alert("Done");
}

//Fade In Page
jQuery(window).load(function() {
    jQuery("body").addClass('all-loaded');
});