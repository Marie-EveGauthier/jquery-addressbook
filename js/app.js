var displayFunctions = require('./lib/display');
// Add foundation dynamic functionality on page
$(document).foundation();


// Start the app by displaying all the addressbooks

displayFunctions.displayAddressBooksList(0, 5);


