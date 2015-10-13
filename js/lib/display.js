// Add foundation dynamic functionality on page
$(document).foundation();

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');

var dataFunctions = require('./retrival');
// var _ = require('underscore');



// Functions that display things on the screen (views)
function displayAddressBooksList(pageNum) {
    dataFunctions.getAddressBooks(pageNum).then(
        function(addressBooks) {
            
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Books List</h2>');
            $app.append('<ul>');
            
            addressBooks.forEach(function(ab) {
                $app.find('ul').append('<li data-id="' + ab.id + '">' + ab.name + '</li>');
            });
            
            $app.find('li').on('click', function() {
                var addressBookId = $(this).data('id');
                console.log(addressBookId);
                displayAddressBook(addressBookId,0);
            });
            
            var previousPage = $('<button>previous page</button>');
            var nextPage = $('<button>next page</button>');
            $app.append(previousPage);
            $app.append(nextPage);
            
            if(pageNum === 0){
                previousPage.toggleClass("disabled");
            }
            
            // if(pageNum === //addressBook.length){ //I need to figure out how to calculate the last page number.
            //     var nextPage = $('<button disable>previous page</button>');
            // }
            
            nextPage.on('click', function() {
                displayAddressBooksList(pageNum + 1);
            });
            previousPage.on('click', function() {
                displayAddressBooksList(pageNum - 1);
            });
            
        }
    );
}

function displayAddressBook(addressBookId,pageNum) {
    dataFunctions.getEntries(addressBookId, pageNum).then(
        function(entries) {
            $app.html('');
            var previousStep = $('<button><--</button>');
            $app.append(previousStep);
            previousStep.on('click', function() {
                displayAddressBooksList(0);
            });
            $app.append('<h2>Address Books Entries</h2>');
            $app.append('<ul>');
            entries.forEach(function(entry){
                $app.find('ul').append('<li data-id="' + entry.id + '">' + entry.lastName + ", " + entry.firstName +'</li>');
            });
            
            $app.find('li').on('click', function() {
                var entryId = $(this).data('id');
                displayEntry(entryId);
            });
            
            var previousPage = $('<button>previous page</button>');
            var nextPage = $('<button>next page</button>');
            $app.append(previousPage);
            $app.append(nextPage);
            
            nextPage.on('click', function() {
                displayAddressBook(addressBookId,pageNum + 1);
            });
            previousPage.on('click', function() {
                displayAddressBook(addressBookId,pageNum - 1);
            });
            
        }
    );
}

function displayEntry(EntryId) {
   
   dataFunctions.getEntry(EntryId).then(
       function(entry){

           $app.html('');
           $app.append('<h2>Entry</h2>');
           
           var $table = $('<table></table>');
           $app.append($table);
           
           $table.append('<tr><th>First Name</th><td>' + entry.firstName + '</td></tr>');
           $table.append('<tr><th>Last Name</th><td>' + entry.lastName + '</td></tr>');
           $table.append('<tr><th>Birthday</th><td>' + entry.birthday + '</td></tr>');
           
           var $addressTr = $('<tr><th>Addresses</th><td></td></tr>');
           $table.append($addressTr);
           
           var $emailTr = $('<tr><th>Emails</th><td></td></tr>');
           $table.append($emailTr);
           
           var $phoneTr = $('<tr><th>Phones</th><td></td></tr>');
           $table.append($phoneTr);

  
           dataFunctions.getAddresses(EntryId).then(
               function(addresses){
                   if (addresses.length === 0) {
                       $addressTr.remove();
                   }
                   else {
                       var $td = $addressTr.find('td');
                       for (var i=0; i< addresses.length; i++) {
                           var add = addresses[i];
                           
                           $td.append('<p class="type">' + add.type + '</p>');
                           $td.append('<p>' + add.line1 + ', ' + add.line2 + '</p>');
                           $td.append('<p>' + add.city + ', ' + add.state + ', ' + add.zip + '</p>');
                           $td.append('<p>' + add.country + '</p>');
                       }
                   }
               }
           );
               
           dataFunctions.getEmails(EntryId).then(
               function(emails){
                   if (emails.length === 0) {
                       $emailTr.remove();
                   }
                   else {
                       var $td = $emailTr.find('td');
                       for (var i=0; i < emails.length; i++) {
                           var mail = emails[i];
                           
                           $td.append('<p class="type">' + mail.type + '</p>');
                           $td.append('<p>' + mail.email + '</p>');
                       }
                   }
               }    
           );       
               
           dataFunctions.getPhones(EntryId).then(
               function(phones){
                   if (phones.length === 0) {
                       $phoneTr.remove();
                   }
                   else {
                       var $td = $phoneTr.find('td');
                       for (var i=0; i < phones.length; i++) {
                           var phone = phones[i];
                           
                           $td.append('<p class="type">' + phone.type + '</p>');
                           $td.append('<p>' + phone.phoneNumber + ' (' + phone.phoneType + ')' + '</p>');
                       }
                   }    
               }
           );
       });
}
// End functions that display views

module.exports={
    displayAddressBooksList: displayAddressBooksList
};
