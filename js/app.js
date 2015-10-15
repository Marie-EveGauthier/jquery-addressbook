var displayFunctions = require('./lib/display');
var Backbone = require('backbone');
// Add foundation dynamic functionality on page
$(document).foundation();


var listingNb = 4;

var router = Backbone.Router.extend({
    routes: {
        '': 'homePage',
        'ab(/:pageNum)': 'showAddressBooks',
        'ab/addressbooks/:id(/:pageNum)': 'showAddressBook',
        'ab/addressbooks/:id1(/:pageNum)/entry/:id2': 'showEntry'
    },
    homePage: function() {
        this.navigate('ab', {trigger: true});
    },
    showAddressBooks: function(pageNum) {
        if (pageNum) {
            displayFunctions.displayAddressBooksList(+pageNum, listingNb);
        }
        else {
            displayFunctions.displayAddressBooksList(0, listingNb);
        }
    },
    showAddressBook: function(id, pageNum) {
        if (pageNum) {
            displayFunctions.displayAddressBook(id, +pageNum, listingNb);
        }
        else {
            displayFunctions.displayAddressBook(id, 0, listingNb);
        }
        
    },
    showEntry: function(id1, pageNum, id2) {
        if (pageNum !== null) {
            displayFunctions.displayEntry(+id2, +pageNum, listingNb, +id1);
        }
        else {
            displayFunctions.displayEntry(+id2, 0, listingNb, +id1);
        }
    }
});

var thisRouter = new router;

thisRouter.on('route:showAddressBooks');

Backbone.history.start();