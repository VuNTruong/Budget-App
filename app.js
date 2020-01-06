var budgetController = (function () {
    
    
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
        
        // Add item to the UI
        
        // Calculate the budget
        
        // Display it
    }
    
    // Set up the event so that when the add button is clicked, the input from the user will be read
    document.querySelector(".add__btn").addEventListener('click', addFunction);
    
    // Set up the event so that when the enter key is pressed, the input from the user will be read
    document.addEventListener('keypress', function(event) {
        if (event.keyCode == 13) {
            
            addFunction();
            
        }
    });
    
})(budgetController, UIController);