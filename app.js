var UIController = (function () {
      
    var removeItemInfo = {
        itemType: "",
        amount: 0
    };
    
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
        
        // Function to set the type of the item to be removed
        setRemoveItemType: function (itemType) {
            removeItemInfo.itemType = itemType;
        },
        
        // Function to set the amount of the item to be removed
        setRemoveItemAmount: function (itemAmount) {
            removeItemInfo.amount = Number(itemAmount);    
        },
        
        // Function to return the type of the item to be removed
        getRemoveItemType: function () {
            return removeItemInfo.itemType; 
        },
        
        // Function to return the amount of the item to be removed
        getRemoveItemAmount: function () {
            return removeItemInfo.amount;
        },
        
        // Function which will be used to add item to the UI
        addListItem: function (obj, type) {
            
            // HTML string to be added and replaced
            var htmlString, newHTML;
            
            // Replace the HTML string with text from placeholder
            
            // The fields in the HTML string that are going to be replaced including: id, description, value, percentage
            
            if (type == 'inc') {
                // HTML string for the income
                htmlString = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">20%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type == 'exp') {
                // HTML string for the expense
                htmlString = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">20%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the text of placeholder with actual data. Update the ID first
            newHTML = htmlString.replace('%id%', obj.id);
            
            // Override the newHTML, not the current HTML. This step is used to update the description
            newHTML = newHTML.replace('%description%', obj.description);
            
            // Override the newHTML, not the current HTML. This step is used to update the value
            newHTML = newHTML.replace('%value%', obj.amount);
            
            // Insert the new HTML string which contains updated information into the HTML file so that the new item will be displayed on the list
            
            console.log(newHTML);
            
            // If the type of the item is expense, insert the new HTML as a child of the expenses__list class
            if (type == 'exp') {
                document.querySelector('.expenses__list').insertAdjacentHTML('beforeend', newHTML);
            }   
            // If the type of the item is income, insert the new HTML as a child of the income__list class
            else if (type == 'inc') {
                document.querySelector('.income__list').insertAdjacentHTML('beforeend', newHTML);
            }
        },
        
        // Function to modify the percentage of the currently existed items when the item is added
        modifyPercentage: function (id, percentage) {
            
            // Multiply the percentage with 100 
            var multipliedPercentage = percentage * 100;
            
            // Reference to the child element where the percentage is displayed and replace its text componenent with the updated percentage
            
            console.log(id);
            
            document.getElementById(id).childNodes[1].childNodes[1].textContent = multipliedPercentage + "%";
            
        },
        
        // Function which will be used to remove item from the UI
        removeListItem: function (itemID) {
            
            // Reference to the object whose id is itemID which has been passed to the method
            var elementToDelete = document.getElementById(itemID);
            
            // Reference to the parent element of the element to remove and remove that element from the parent node
            elementToDelete.parentNode.removeChild(elementToDelete);
            
        },
        
        // This function will be called after each time a new item is added in order to remove the component of the previous input
        clearField: function () {
            
            // This one is used to hold the list of input values
            var fields;
            
            // This one is used to hold the array of input values
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
            // Replace the part of the HTML file which will help with displaying date and time by accessing its textContent  
            document.querySelector('budget__title--month').textContent = currentDateAndTime;
        },
        
        // Function which will be used to reset the current income and expense to 0 when initializing the app
        resetIncomeAndExpense: function () {
            
            // Set the current income to 0 and display it on the UI
            document.querySelector('.budget__income--value').textContent = Number(0);
            
            // Set the current expense to 0 and display it to the UI
            document.querySelector('.budget__expenses--value').textContent = Number(0);
        },
        
        // Function which will be used to update the current budget for item that has been added
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
        
        // Function which will be used to update the current budget for item that has been removed
        updateBudgetRemove: function (inputType, inputValue) {
            
            // Variable to store the calculated budget which will also be returned later
            var calculatedBudget = 0;
            
            // Get the current total budget from the UI
            var totalBudget = Number(document.querySelector('.budget__value').textContent);
            
            // Calculate the budget
            if (inputType == 'inc') {
                calculatedBudget = totalBudget - Number(inputValue);
            } else if (inputType == 'exp') {
                calculatedBudget = totalBudget + Number(inputValue);
            }
            
            // Display the calculated budget
            document.querySelector('.budget__value').textContent = calculatedBudget;
            
            // Return the calculated budget
            return calculatedBudget;
        }, 
        
        // Function to update the current percentage for the total income
        updateIncomePercentage: function (percentage) {
            document.querySelector('.budget__income--percentage').textContent = percentage + "%";
        },
        
        // Function to update the current percentage for the total expense
        updateExpensePercentage: function (percentage) {
            document.querySelector('.budget__expenses--percentage').textContent = percentage + "%";
        },
    
    };
    
})();

var budgetController = (function (UICtrl) {
    
    // Constructor to construct an object for an expense
    var Expense = function (id, description, amount, percentage) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.percentage = percentage;
        
        this.getID = function () {
            return this.id;
        };
        
        this.getDescription = function () {
            return this.description;
        };
        
        this.getAmount = function () {
            return this.amount;
        };
        
        this.getPercentage = function () {
            return this.percentage;  
        };
        
        this.getType = function () {
            return 'exp';
        }
    };
    
    // Constructor to construct an object foe an income
    var Income = function (id, description, amount, percentage) {
        this.id = id;
        this.description = description;
        this.amount = amount;
        this.percentage = percentage;
        
        this.getID = function () {
            return this.id;
        };
        
        this.getDescription = function () {
            return this.description;
        };
        
        this.getAmount = function () {
            return this.amount;
        };
        
        this.getPercentage = function () {
            return this.percentage;  
        };
        
        this.getType = function () {
            return 'inc';  
        };
    };
    
    // Object to hold data for total income
    var incomeData = {
        // Array which will be used to store income objects
        arrayOfIncome : [],
        
        // Variable to hold the total income
        totalIncome : 0
    };
    
    // Object to hold data for total expense
    var expenseData = {
        // Array which will be used to store expense objects
        arrayOfExpense : [],
    
        // Variable to hold the total expense
        totalExpense : 0
    };
    
    return {
        
        // Function which will be used to add new item to the array of data structures and return the newly created object
        addItem: function (type, description, amount, percentage) {
            
            var newItem, ID;
            
            // ID will be the total number of items
            ID = (incomeData.arrayOfIncome.length + expenseData.arrayOfExpense.length) + 1; 
            
            if (type == "inc") {
                // Create a new item for income
                newItem = new Income(ID, description, amount, percentage);
                
                // Add that item to the array of incomes
                incomeData.arrayOfIncome.push(newItem);
                
                // Add the value to the total income so that the total amount is updated
                incomeData.totalIncome += Number(amount);
                
            } else if (type == "exp") {
                // Create a new item for expense
                newItem = new Expense(ID, description, amount, percentage);
                
                // Add that item to the array of expense
                expenseData.arrayOfExpense.push(newItem);
                
                // Add the value to the total expense so that the total amount is updated
                expenseData.totalExpense += Number(amount);
            }
            
            // Return a new item that just has been created
            return newItem;
        },
        
        // Function which will be called to delete an existing item from the data structure
        deleteItem: function (type, id) {
            
            // Get the index of item based on the id provided
            
            // If the type of the item is income, get the object from the array for the income objects. Must convert the id parameter passed to the method into number in order to be able to compare
            if (type == 'income') {                
                for (var i = 0; i < incomeData.arrayOfIncome.length; i++) {
                    if (incomeData.arrayOfIncome[i].id == Number(id)) {
                    
                        // Once the item is found, save that item into the variable
                        var arrayItemToRemove = incomeData.arrayOfIncome[i];
                        
                        // Set the type of the item to be removed to income
                        UICtrl.setRemoveItemType('inc');
                        
                        // Set the amount of the item to be remove
                        UICtrl.setRemoveItemAmount(arrayItemToRemove.amount);
                        
                        // Substract the amount of the income item that has been remove from the budget
                        incomeData.totalIncome -= Number(arrayItemToRemove.amount);
                        
                        // Remove that item away from the data structure
                        incomeData.arrayOfIncome.splice(incomeData.arrayOfIncome.indexOf(arrayItemToRemove), 1);

                    }
                }
            }
            // If the type of the item is expense, get the object from the array of the expense objects. Must also convert the id parameter passed to the method into number in order to be able to compare
            else if (type == 'expense') {
                
                for (var i = 0; i < expenseData.arrayOfExpense.length; i++) {
                    if (expenseData.arrayOfExpense[i].id == Number(id)) {
                        
                        // Once the item is found, save that item into the variable
                        var arrayItemToRemove = expenseData.arrayOfExpense[i];
                        
                        // Set the type of the item to be remove to expense
                        UICtrl.setRemoveItemType('exp');
                        
                        // Set the amount of the item to be removed
                        UICtrl.setRemoveItemAmount(arrayItemToRemove.amount);
                    
                        // Substract the amount of the expense item that has been remove from the budget
                        expenseData.totalExpense -= Number(arrayItemToRemove.amount);
                        
                        // Remove that item away from the data structure
                        expenseData.arrayOfExpense.splice(expenseData.arrayOfExpense.indexOf(arrayItemToRemove), 1);
                        
                    }
                }
            }
            
        },
        
        // Function to return an array of incomes
        getArrayOfIncome: function () {
            return incomeData.arrayOfIncome;
        },
        
        // Function to return an array of expenses
        getArrayOfExpense: function () {
            return expenseData.arrayOfExpense;
        },
        
        // Function which will be used to get the total income
        getTotalIncome: function () {
            return Number(incomeData.totalIncome);
        },
        
        // Function which will be used to get the total expense
        getTotalExpense: function () {
            return Number(expenseData.totalExpense);
        },
        
        // Function to return the array of amount for income
        getArrayOfAmountIncome: function () {
            return incomeData.arrayOfIncome;
        },
        
        // Function to return the array of amount for expense
        getArrayOfAmountExpense: function () {
            return expenseData.arrayOfExpense;
        },
        
        // Function to update the percentage of existing items when new item is added. The function will reference to the item by using its type and id.
        updateCurrentItemPercentage (type, id, newPercentage) {
            if (type == 'inc') {
                for (var i = 0; i < incomeData.arrayOfIncome.length; i++) {
                    if (incomeData.arrayOfIncome[i].id == Number(id)) {
                        incomeData.arrayOfIncome[i].percentage = newPercentage;
                    }
                }
            } else if (type == 'exp') {
                for (var i = 0; i < expenseData.arrayOfExpense.length; i++) {
                    if (expenseData.arrayOfExpense[i].id == Number(id)) {
                        expenseData.arrayOfExpense[i].percentage = newPercentage;
                    }
                }
            }
        }
    };
    
})(UIController);

var controller = (function (budgetCtrl, UICtrl) {
        
    // Function to set up current date and time
    var setupDateAndTime = function () {
        // Call the function to set up current date and time
        var d = new Date();

        UICtrl.updateCurrentDateAndTime((d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear());

        // Ask the user to enter the available budget for the current day
        //document.querySelector('.budget__value').textContent = Number(prompt('Enter the available budget for today'));
        document.querySelector('.budget__value').textContent = Number(3000);

        // Reset the current income and expense
        UICtrl.resetIncomeAndExpense();
    }
    
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
        
        // Calculate the percentage of the newly added item
        var newlyAddedPercentage = 0;
        
        if (UICtrl.getUserInputType() == 'inc') {
            newlyAddedPercentage = (Number(UICtrl.getUserInputValue()) / (Number(budgetCtrl.getTotalIncome()) + Number(UICtrl.getUserInputValue()))) * 100;
            //console.log(Number(budgetCtrl.getTotalIncome()) + Number(UICtrl.getUserInputValue()));
            console.log(UICtrl.getUserInputValue());
        } else if (UICtrl.getUserInputType() == 'exp') {
            newlyAddedPercentage = (Number(UICtrl.getUserInputValue()) / (Number(budgetCtrl.getTotalExpense()) + Number(UICtrl.getUserInputValue()))) * 100;
        }
        
        // Add item to budget controller
        newItem = budgetCtrl.addItem(UICtrl.getUserInputType(), UICtrl.getUserInputDescription(), UICtrl.getUserInputValue(), newlyAddedPercentage);
        
        // Add item to the UI
        UICtrl.addListItem({
            id: newItem.id,
            amount: newItem.amount,
            description: newItem.description,
            percentage: newItem.percentage
        }, UICtrl.getUserInputType());
        
        // Calculate the budget by calling the update total income and update total expense method from the UIController object
        // Update the total expense and display it
        UICtrl.updateTotalExpense(budgetCtrl.getTotalExpense());
        
        // Update the total income and display it
        UICtrl.updateTotalIncome(budgetCtrl.getTotalIncome());
        
        // Update the total budget and display it
        UICtrl.updateBudget(UICtrl.getUserInputType(), UICtrl.getUserInputValue());
        
        // Update the percentage of the current items
        // Get the array of currently existed income items and store in an array
        var arrayOfAmountIncome = budgetCtrl.getArrayOfAmountIncome();
        
        // Update the percentages for the incomes
        // Round the raw percentage (percentage which hasn't been updated by multiplication with 100) to the nearesst 4 decimal places so that it won't look ugly when they are displayed
        for (var i = 0; i < budgetCtrl.getArrayOfIncome().length; i++) {
            budgetCtrl.updateCurrentItemPercentage(budgetCtrl.getArrayOfIncome()[i].getType(), budgetCtrl.getArrayOfIncome()[i].getID(), ((Number(budgetCtrl.getArrayOfIncome()[i].getAmount()) / Number(budgetCtrl.getTotalIncome())).toFixed(4)));
            
            // Update the percentage to display on the UI
            UICtrl.modifyPercentage('income-' + budgetCtrl.getArrayOfIncome()[i].getID(), budgetCtrl.getArrayOfIncome()[i].getPercentage());
        }
        
        // Get the array of currently existed expense items and store in an array
        var arrayOfAmountExpense = budgetCtrl.getArrayOfAmountExpense();
        
        // Update the percentages for the expenses
        // Round the raw percentage (percentage which hasn't been updated by multiplication with 100) to the nearest 4 decimal places so that it won't look ugly when they are displayed
        for (var i = 0; i < budgetCtrl.getArrayOfExpense().length; i++) {
            budgetCtrl.updateCurrentItemPercentage(budgetCtrl.getArrayOfExpense()[i].getType(), budgetCtrl.getArrayOfExpense()[i].getID(), ((Number(budgetCtrl.getArrayOfExpense()[i].getAmount()) / Number(budgetCtrl.getTotalExpense())).toFixed(4)));
            
            // Update the percentages to display on the UI
            UICtrl.modifyPercentage('expense-' + budgetCtrl.getArrayOfExpense()[i].getID(), budgetCtrl.getArrayOfExpense()[i].getPercentage());
        }
        
        // Get the current total of expense and income
        
        // Calculate the percentage and call the function from UI Controller to display it on the UI
        UICtrl.updateIncomePercentage((Number(budgetCtrl.getTotalIncome()) / (Number(budgetCtrl.getTotalIncome()) + Number(budgetCtrl.getTotalExpense()))).toFixed(4) * 100);
        
        UICtrl.updateExpensePercentage((Number(budgetCtrl.getTotalExpense()) / (Number(budgetCtrl.getTotalIncome()) + Number(budgetCtrl.getTotalExpense()))).toFixed(4) * 100);
        
        // Clear the field
        UICtrl.clearField();
    };
    
    // Function which will be called to remove item from the list
    var deleteController = function (event) {
        
        // Variable to hold the id of the item want to delete from the UI (this is in the form of income-1) 
        var itemID;
        
        // Array of 2 elements to hold the type of the item and the id of it
        var splitID;
        
        // Variable to hold the type of the item on the UI
        var itemType;
        
        // Variable to hold the numeric id of the element
        var numericID;
        
        // Get the parent component of the element. In order to delete the whole item from the UI, we need to reference to the parent node of the item. (<div class="item clearfix" id="income-0">) and get rid of that in order to get rid of the whole thing. 
        // All we need to know about the element is its ID, becuase it will help with referencing the right element
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;   
        
        // If the element clicked has an id (it is either an income or expense item), then delete that element
        if (itemID) {
            
            // Split the itemID which has the form like (income-1 into a string that contains type and number so that it will be easier to find out which list to remove from)
            splitID = itemID.split('-');
            
            // Set the item type. This will be the first element of the splitID array 
            itemType = splitID[0];

            // Set the numeric id. This will be the second element of the splitID array
            numericID = splitID[1];
            
            // Delete item from the income list
            budgetCtrl.deleteItem(itemType, numericID);
            
            // Delete that item from the UI
            UICtrl.removeListItem(itemID);
            
            // Update the budget
            // Calculate the budget by calling the update total income and update total expense method from the UIController object
            // Update the total expense and display it
            UICtrl.updateTotalExpense(budgetCtrl.getTotalExpense());

            // Update the total income and display it
            UICtrl.updateTotalIncome(budgetCtrl.getTotalIncome());

            // Update the total budget and display it
            UICtrl.updateBudgetRemove(UICtrl.getRemoveItemType(), UICtrl.getRemoveItemAmount());
            
            // Update the percentage of the current items
            // Round the raw percentage (percentage which hasn't been updated by multiplication with 100) to the nearesst 4 decimal places so that it won't look ugly when they are displayed
            for (var i = 0; i < budgetCtrl.getArrayOfIncome().length; i++) {
                budgetCtrl.updateCurrentItemPercentage(budgetCtrl.getArrayOfIncome()[i].getType(), budgetCtrl.getArrayOfIncome()[i].getID(), ((Number(budgetCtrl.getArrayOfIncome()[i].getAmount()) / Number(budgetCtrl.getTotalIncome())).toFixed(4)));

                // Update the percentage to display on the UI
                UICtrl.modifyPercentage('income-' + budgetCtrl.getArrayOfIncome()[i].getID(), budgetCtrl.getArrayOfIncome()[i].getPercentage());
            }

            // Get the array of currently existed expense items and store in an array
            var arrayOfAmountExpense = budgetCtrl.getArrayOfAmountExpense();

            // Update the percentages for the expenses
            // Round the raw percentage (percentage which hasn't been updated by multiplication with 100) to the nearest 4 decimal places so that it won't look ugly when they are displayed
            for (var i = 0; i < budgetCtrl.getArrayOfExpense().length; i++) {
                budgetCtrl.updateCurrentItemPercentage(budgetCtrl.getArrayOfExpense()[i].getType(), budgetCtrl.getArrayOfExpense()[i].getID(), ((Number(budgetCtrl.getArrayOfExpense()[i].getAmount()) / Number(budgetCtrl.getTotalExpense())).toFixed(4)));

                // Update the percentages to display on the UI
                UICtrl.modifyPercentage('expense-' + budgetCtrl.getArrayOfExpense()[i].getID(), budgetCtrl.getArrayOfExpense()[i].getPercentage());
            }
            
            // Calculate the percentage and call the function from UI Controller to display it on the UI
            UICtrl.updateIncomePercentage((Number(budgetCtrl.getTotalIncome()) / (Number(budgetCtrl.getTotalIncome()) + Number(budgetCtrl.getTotalExpense()))).toFixed(4) * 100);

            UICtrl.updateExpensePercentage((Number(budgetCtrl.getTotalExpense()) / (Number(budgetCtrl.getTotalIncome()) + Number(budgetCtrl.getTotalExpense()))).toFixed(4) * 100);
        }
    };
    
    // Function to set up event listener
    var setupEventListener = function () {
        // Set up the event so that when the add button is clicked, the input from the user will be read and new item will be added to the UI
        document.querySelector(".add__btn").addEventListener('click', addFunction);
        
        // Set up event so that when the user can delete item from the UI
        document.querySelector(".container").addEventListener('click', deleteController);

        // Set up the event so that when the enter key is pressed, the input from the user will be read
        document.addEventListener('keypress', function(event) {
            if (event.keyCode == 13) {

                // Call the add function in order to able to add the item into the UI
                addFunction();

            }
        });
    }
    
    return {
        initialize : function () {
            
            // Call the function to set up date and time
            setupDateAndTime();
            
            // Call the function to set up event listener
            setupEventListener();
            
        }
    };
    
})(budgetController, UIController);

// Call the initialize function of the controller to initialize the app
controller.initialize();