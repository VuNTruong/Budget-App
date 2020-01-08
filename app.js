var budgetController = (function () {
    
    // Constructor to construct an object for an expense
    var Expense = function (id, description, amount) {
        this.id = id;
        this.description = description;
        this.amount = amount;
    }
    
    // Constructor to construct an object foe an income
    var Income = function (id, description, amount) {
        this.id = id;
        this.description = description;
        this.amount = amount;
    }
    
    // Object to hold data for total income
    var incomeData = {
        // Array which will be used to store income objects
        arrayOfIncome : [],
        
        // Variable to hold the total income
        totalIncome : 0
    }
    
    // Object to hold data for total expense
    var expenseData = {
        // Array which will be used to store expense objects
        arrayOfExpense : [],
    
        // Variable to hold the total expense
        totalExpense : 0
    }
    
    return {
        
        // Function which will be used to add new item to the array of data structures and return the newly created object
        addItem: function (type, description, amount) {
            
            var newItem, ID;
            
            // ID will be the total number of items
            ID = (incomeData.arrayOfIncome.length + expenseData.arrayOfExpense.length) + 1; 
            
            if (type == "inc") {
                // Create a new item for income
                newItem = new Income(ID, description, amount);
                
                // Add that item to the array of incomes
                incomeData.arrayOfIncome.push(newItem);
                
                // Add the value to the total income so that the total amount is updated
                incomeData.totalIncome += Number(amount);
                
            } else if (type == "exp") {
                // Create a new item for expense
                newItem = new Expense(ID, description, amount);
                
                // Add that item to the array of expense
                expenseData.arrayOfExpense.push(newItem);
                
                // Add the value to the total expense so that the total amount is updated
                expenseData.totalExpense += Number(amount);
            }
            
            // Return a new item that just has been created
            return newItem;
        },
        
        // Function which will be used to get the total income
        getTotalIncome: function () {
            return Number(incomeData.totalIncome);
        },
        
        // Function which will be used to get the total expense
        getTotalExpense: function () {
            return Number(expenseData.totalExpense);
        }
    }
    
})();

var UIController = (function () {
             
    return {
        // Function to return the type of the input
        getUserInputType: function () {
            return document.querySelector(".add__type").value;
        },
    
        // Function to return the description of the input
        getUserInputDescription: function () {
            return document.querySelector(".add__description").value;
        },
        
        // Function to return the value of the input
        getUserInputValue: function () {
            return document.querySelector(".add__value").value;
        },
        
        // Function which will be used to add item to the UI
        addListItem: function (obj, type) {
            
            // HTML string to be added and replaced
            var htmlString, newHTML;
            
            // Replace the HTML string with text from placeholder
            
            // The fields in the HTML string that are going to be replaced including: id, description, value, percentage
            
            if (type == 'inc') {
                // HTML string for the income
                htmlString = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type == 'exp') {
                // HTML string for the expense
                htmlString = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value>%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the text of placeholder with actual data
            newHTML = htmlString.replace('%id%', obj.id);
            
            // Override the newHTML, not the current HTML
            newHTML = newHTML.replace('%description%', obj.description);
            
            // Override the newHTML, not the current HTML
            newHTML = newHTML.replace('%value%', obj.amount);
            
            // Insert the new HTML string which contains updated information into the HTML file so that the new item will be displayed on the list
            
            // If the type of the item is expense, insert the new HTML as a child of the expenses__list class
            if (type == 'exp') {
                document.querySelector('.expenses__list').insertAdjacentHTML('beforeend', newHTML);
            }   
            // If the type of the item is income, insert the new HTML as a child of the income__list class
            else if (type == 'inc') {
                document.querySelector('.income__list').insertAdjacentHTML('beforeend', newHTML);
            }
        },
        
        // This function will be called after each time a new item is added in order to remove the component of the previous input
        clearField: function () {
            
            // This one is used to hold the list of input values
            var fields;
            
            // Thí one is used to hold the array of input values
            var fieldArray;
            
            fields = document.querySelectorAll('.add__description' + ', ' + '.add__value');
            
            // Convert that field into an array and store it into the fieldArray
            fieldArray = Array.prototype.slice.call(fields);
            
            fieldArray.forEach(function(curent, index, array) {
                curent.value = "";
            });
        },
        
        // Function which will be used to update the total income
        updateTotalIncome: function (totalIncome) {
            // Get the total income element of the HTML and set it to the current total income value
            document.querySelector('.budget__income--value').textContent = totalIncome;
        },
        
        // Function which will be used to update the total expense
        updateTotalExpense: function (totalExpense) {
            // Get the total expense element of the HLTM and set it to the current total expense value
            document.querySelector('.budget__expenses--value').textContent = totalExpense;
        },
        
        // Function which will be used to update the current date and time
        updateCurrentDateAndTime: function (currentDateAndTime) {
            // Replace the part of the HTML file which will help with displaying date and time
            document.body.innerHTML = document.body.innerHTML.replace('<span class="budget__title--month">%Month%</span>', '<span class="budget__title--month">' + currentDateAndTime + '</span>')
        },
        
        // Function which will be used to reset the current income and expense to 0 when initializing the app
        resetIncomeAndExpense: function () {
            
            // Set the current income to 0 and display it on the UI
            document.querySelector('.budget__income--value').textContent = Number(0);
            
            // Set the current expense to 0 and display it to the UI
            document.querySelector('.budget__expenses--value').textContent = Number(0);
        },
        
        // Function which will be used to update the current budget
        updateBudget: function (inputType, inputValue) {
            
            // Variable to store the calculated budget which will also be returned later
            var calculatedBudget = 0;
            
            // Get the current total budget from the UI
            var totalBudget = Number(document.querySelector('.budget__value').textContent);
            
            // Calculate the budget
            if (inputType == 'inc') {
                calculatedBudget = totalBudget + Number(inputValue);
            } else if (inputType == 'exp') {
                calculatedBudget = totalBudget - Number(inputValue);
            }
            
            // Display the calculated budget
            document.querySelector('.budget__value').textContent = calculatedBudget;
            
            // Return the calculated budget
            return calculatedBudget;
        },
    
    };
    
})();

var controller = (function (budgetCtrl, UICtrl) {
    
    // Function to be executed when either add button is clicked or enter key is pressed to add item to the list and display on the UI
    var addFunction = function () {
        
        // Newly created object
        var newItem;
        
        // Get the input from the user and validate it
        if (UICtrl.getUserInputDescription() == "" || UICtrl.getUserInputValue() <= 0 || isNaN(Number(UICtrl.getUserInputValue()))) {
            // Let the user know that the invalid input has been entered
            alert('The input is invalid. Please make sure that \n 1. The input for description is not blank \n 2. Input value is greater than 0 \n 3. The input for value are all numeric');
            
            // Get out of the function
            return;
        }
        
        // Add item to budget controller
        newItem = budgetCtrl.addItem(UICtrl.getUserInputType(), UICtrl.getUserInputDescription(), UICtrl.getUserInputValue());
        
        // Add item to the UI
        UICtrl.addListItem({
            id: newItem.id,
            amount: newItem.amount,
            description: newItem.description
        }, UICtrl.getUserInputType());
        
        // Calculate the budget by calling the update total income and update total expense method from the UIController object
        // Update the total expense and display it
        UICtrl.updateTotalExpense(budgetCtrl.getTotalExpense());
        
        // Update the total income and display it
        UICtrl.updateTotalIncome(budgetCtrl.getTotalIncome());
        
        // Update the total budget and display it
        UICtrl.updateBudget(UICtrl.getUserInputType(), UICtrl.getUserInputValue());
        
        // Clear the field
        UICtrl.clearField();
    }
    
    // Function which will be called to remove item from the list
    var deleteController = function (event) {
        console.log(event.target);   
        console.log('Clicked');
    }
    
    // Function to set up event listener
    var setupEventListener = function () {
        
        // Set up the event so that when the add button is clicked, the input from the user will be read
        document.querySelector(".add__btn").addEventListener('click', addFunction);

        // Set up the event so that when the enter key is pressed, the input from the user will be read
        document.addEventListener('keypress', function(event) {
            if (event.keyCode == 13) {

                addFunction();

            }
        });
        
        // Function which will be used to delete item from the list
        document.querySelector('.container').addEventListener('click', deleteController);
    }
    
    // Return the object that will call the function which will be use to initialize the app
    return {
        initialize: function () {
            
            // Call the function to set up event listener when the app starts
            setupEventListener();
            
            // Call the function to set up current date and time
            var d = new Date();
            
            UICtrl.updateCurrentDateAndTime((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear());
            
            // Ask the user to enter the available budget for the current day
            //document.querySelector('.budget__value').textContent = Number(prompt('Enter the available budget for today'));
            document.querySelector('.budget__value').textContent = Number(3000);
            
            // Reset the current income and expense
            UICtrl.resetIncomeAndExpense();
        }
    }
    
})(budgetController, UIController);

// Call the initialize function to initialize the app
controller.initialize();