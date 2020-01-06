var budgetController = (function () {
    
    // Constructor to construct an object for an expense
    var Expense = function (type, description, amount) {
        this.type = type;
        this.description = description;
        this.amount = amount;
    }
    
    // Constructor to construct an object foe an income
    var Income = function (type, description, amount) {
        this.type = type;
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
        addItem: function (type, description, amount) {
            
            var newItem, ID;
            
            // ID will be the total number of items
            ID = (incomeData.arrayOfIncome.length + expenseData.arrayOfExpense.length); 
            
            if (type == "inc") {
                // Create a new item for income
                newItem = new Income(type, description, amount);
                
                console.log('New item added');
                
                // Add that item to the array of incomes
                incomeData.arrayOfIncome.push(newItem);
                
            } else if (type == "exp") {
                // Create a new item for expense
                newItem = new Expense(type, description, amount);
                
                // Add that item to the array of expense
                expenseData.arrayOfExpense.push(newItem);
            }
        },
        
        showIncomeItem: function () {
            return incomeData.arrayOfIncome.length;
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
        }
    };
    
})();

var controller = (function (budgetCtrl, UICtrl) {
    
    // Function to be executed when either add button is clicked or enter key is pressed
    var addFunction = function () {
        // Get the input from the user
        console.log(UICtrl.getUserInputType());
        
        console.log(UICtrl.getUserInputDescription());
        
        console.log(UICtrl.getUserInputValue());
        
        // Add item to budget controller
        budgetCtrl.addItem(UICtrl.getUserInputType, UICtrl.getUserInputDescription, UICtrl.getUserInputValue);
        
        console.log(budgetCtrl.showIncomeItem());
        
        // Add item to the UI
        
        // Calculate the budget
        
        // Display it
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
    }
    
    // Return the object that will call the function which will be use to initialize the app
    return {
        initialize: function () {
            
            console.log('This is working ');
            
            setupEventListener();
        }
    }
    
})(budgetController, UIController);

// Call the initialize function to initialize the app
controller.initialize();