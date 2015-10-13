// Add foundation dynamic functionality on page
$(document).foundation();

// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');



// Data retrieval functions
function getAddressBooks(skip) {
    return $.getJSON(API_URL + '/AddressBooks?filter={"order":"name%20ASC","limit":5,"skip":' + (skip * 5) + '}');
}

function getAddressBook(id) {
    return $.getJSON(API_URL + '/AddressBooks/' + id);
}

function getEntries(addressBookId, skip) {
    return $.getJSON(API_URL + '/AddressBooks/' + addressBookId + '/entries?filter={"order":"lastname%20ASC","limit":5, "skip":' + (skip * 5) + '}');
}

function getEntry(entryId) {
    return $.getJSON(API_URL + '/Entries/' + entryId);
}

function getAddresses(entryId) {
   return $.getJSON(API_URL + '/Entries/' + entryId + '/addresses');
}

function getEmails(entryId) {
   return $.getJSON(API_URL + '/Entries/' + entryId + '/emails');
}

function getPhones(entryId) {
   return $.getJSON(API_URL + '/Entries/' + entryId + '/phones');
}
// End data retrieval functions

// Functions that display things on the screen (views)
function displayAddressBooksList() {
    // Reference number for pagination of Address Books display page
    var abKey = 0;
    getAddressBooks(0).then(
        function(addressBooks) {
            
            $app.html(''); // Clear the #app div
            $app.append('<h2>Address Books List</h2>');
            $app.append('<ul>');
            var previousPage = $('<button>previous page</button>');
            var nextPage = $('<button>next page</button>');
            $app.append(previousPage);
            $app.append(nextPage);
            
            addressBooks.forEach(function(ab) {
                $app.find('ul').append('<li data-id="' + ab.id + '">' + ab.name + '</li>');
            });
            
            $app.find('li').on('click', function() {
                var addressBookId = $(this).data('id');
                displayAddressBook(addressBookId);
            });
            
            nextPage.on('click', function() {
                getAddressBooks(abKey);
                abKey += 1;
             });
            
        }
    );
}

function displayAddressBook(addressBookId) {
    getEntries(addressBookId, 0).then(
        function(entries) {
            $app.html('');
            $app.append('<h2>Address Books Entries</h2>');
            $app.append('<ul>');
            entries.forEach(function(entry){
                $app.find('ul').append('<li data-id="' + entry.id + '">' + entry.lastName + entry.firstName +'</li>');
            });
            
            $app.find('li').on('click', function() {
                var entryId = $(this).data('id');
                displayEntry(entryId);
            });
        }
    );
}

function displayEntry(EntryId) {
    
    getEntry(EntryId).then(
        function(entry){

            $app.html('');
            $app.append('<h2>Contact informations</h2>');
            
            var $table = $('<table></table>');
            $app.append($table);
            
            $table.append('<tr><th class="rowName">First Name</th><td class="data">' + entry.firstName + '</td></tr>');
            $table.append('<tr><th class="rowName">Last Name</th><td class="data">' + entry.lastName + '</td></tr>');
            $table.append('<tr><th class="rowName">Birthday</th><td class="data">' + entry.birthday + '</td></tr>');
            
            var $addressTr = $('<tr><th class="rowName">Addresses</th><td></td></tr>');
            $table.append($addressTr);
            
            var $emailTr = $('<tr><th class="rowName">Emails</th><td></td></tr>');
            $table.append($emailTr);
            
            var $phoneTr = $('<tr><th class="rowName">Phones</th><td></td></tr>');
            $table.append($phoneTr);

   
            getAddresses(EntryId).then(
                function(addresses){
                    if (addresses.length === 0) {
                        $addressTr.remove();
                    }
                    else {
                        var $td = $addressTr.find('td');
                        for (var i=0; i< addresses.length; i++) {
                            var add = addresses[i];
                            
                            $td.append('<p class="type">' + add.type + '</p>');
                            $td.append('<p class="data">' + add.line1 + ', ' + add.line2 + '</p>');
                            $td.append('<p class="data">' + add.city + ', ' + add.state + ', ' + add.zip + '</p>');
                            $td.append('<p class="data">' + add.country + '</p>');
                        }
                    }
                }
            );
                
            getEmails(EntryId).then(
                function(emails){
                    if (emails.length === 0) {
                        $emailTr.remove();
                    }
                    else {
                        var $td = $emailTr.find('td');
                        for (var i=0; i < emails.length; i++) {
                            var mail = emails[i];
                            
                            $td.append('<p class="type">' + mail.type + '</p>');
                            $td.append('<p class="data">' + mail.email + '</p>');
                        }
                    }
                }    
            );       
                
            getPhones(EntryId).then(
                function(phones){
                    if (phones.length === 0) {
                        $phoneTr.remove();
                    }
                    else {
                        var $td = $phoneTr.find('td');
                        for (var i=0; i < phones.length; i++) {
                            var phone = phones[i];
                            
                            $td.append('<p class="type">' + phone.type + '</p>');
                            $td.append('<p class="data">' + phone.phoneNumber + ' (' + phone.phoneType + ')' + '</p>');
                        }
                    }    
                }
            );
        });
}
// End functions that display views


// Start the app by displaying all the addressbooks
//displayAddressBook(2);
//displayAddressBooksList();
displayEntry(4);
