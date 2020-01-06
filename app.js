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
        
        testing: function () {
            console.log(incomeData);

            console.log(expenseData);
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
        }
    };
    
})();

var controller = (function (budgetCtrl, UICtrl) {
    
    // Function to be executed when either add button is clicked or enter key is pressed
    var addFunction = function () {
        
        // Newly created object
        var newItem;
        
        // Get the input from the user
        console.log(UICtrl.getUserInputType());
        
        console.log(UICtrl.getUserInputDescription());
        
        console.log(UICtrl.getUserInputValue());
        
        // Add item to budget controller
        newItem = budgetCtrl.addItem(UICtrl.getUserInputType(), UICtrl.getUserInputDescription(), UICtrl.getUserInputValue());
        
        // Add item to the UI
        UICtrl.addListItem({
            id: newItem.id,
            amount: newItem.amount,
            description: newItem.description
        }, UICtrl.getUserInputType());
        
        // Calculate the budget
        
        // Display it
    }
    
    // Function to set up event listener
    var setupEventListener = function () {
        
        console.log('Event listener has been set ');
        
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