// Add foundation dynamic functionality on page
$(document).foundation();

// Get a reference to the <div id="app">. This is where we will output our stuff
var $app = $('#app');

var dataFunctions = require('./retrival');
var _ = require('underscore');

// Function that displays the AddressBooks lists
function displayAddressBooksList(pageNum, display) {
    dataFunctions.getAddressBooks(pageNum, display).then(
        function(results) {

            var addressBooks = results.addressBooks;
            var hasNextPage = results.hasNextPage;

            $app.html(''); // Clear the #app div
            $app.append('<section class="small-block-grid-12"><h2>Address Books List</h2></section>');
            $app.append('<ul class="no-bullet">');

            addressBooks.forEach(function(ab) {
                $app.find('ul').append('<li data-id="' + ab.id + '"><a href="#ab/addressbooks/' + ab.id + '">' + ab.name + '</a></li>');
            });

            //Previous page/next page buttons
            var previousPage = $('<a href="#ab/' + (pageNum - 1) + '"><button class="button round">previous page</button></a>');
            var nextPage = $('<a href="#ab/' + (pageNum + 1) + '"><button class="button round">next page</button></a>');


            //disable first previous page button
            if (pageNum !== 0) {
                $app.append(previousPage);
            }
            //disable last next button
            if (hasNextPage === true) {
                $app.append(nextPage);
            }
        }
    );
}

//Function that displays the Entries of a specific Address Book

function displayAddressBook(addressBookId, pageNum, display) {
    dataFunctions.getEntries(addressBookId, pageNum, display).then(
        function(results) {

            var entries = results.entries;
            var hasNextPage = results.hasNextPage;


            $app.html('');

            //Main content
            $app.append('<section class="small-block-grid-12"><h2>Address Book Entries</h2></section>');


            //Button that takes you back to the previous step

            var previousStep = $('<a href="#ab"><button> <<< </button></a>');

            $app.append(previousStep);
            // previousStep.on('click', function() {
            //     displayAddressBooksList(0, display);
            // });


            $app.append('<ul class="no-bullet">');
            entries.forEach(function(entry) {
                $app.find('ul').append('<li data-id="' + entry.id + '"><a href="#ab/addressbooks/' + addressBookId + '/' + pageNum + '/entry/' + entry.id + '">' + entry.lastName + ", " + entry.firstName + '</a></li>');

            });

            // $app.find('li').on('click', function() {
            //     var entryId = $(this).data('id');
            //     displayEntry(entryId, 0, display, addressBookId);
            // });

            //Previous and next button - creation and functionality

            var previousPage = $('<a href="#ab/addressbooks/' + addressBookId + '/' + (pageNum - 1) + '"><button class="button round">previous page</button></a>');
            var nextPage = $('<a href="#ab/addressbooks/' + addressBookId + '/' + (pageNum + 1) + '"><button class="button round">next page</button></a>');

            //disable first previous page button
            if (pageNum !== 0) {
                $app.append(previousPage);
            }

            //disable last next page button
            if (hasNextPage) {
                $app.append(nextPage);
            }
        }
    );
}

//function that displays a specific Entry within a specific AddressBook

function displayEntry(EntryId, pageNum, display, addressBookId) {

    dataFunctions.getEntry(EntryId).then(
        function(entry) {
            $app.html('');


            //main content
            $app.append('<section class="small-block-grid-12"><h2>Entry</h2></section>');

            //Button that takes you back to the previous step

            var previousStep = $('<a href="#ab/addressbooks/' + addressBookId + '/' + pageNum + '"><button> <<< </button></a>');
            
            $app.append(previousStep);

 // table that will receives all the data of a specific entry
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


            dataFunctions.getAddresses(EntryId).then(
                function(addresses) {
                    if (addresses.length === 0) {
                        $addressTr.remove();
                    }
                    else {
                        var $td = $addressTr.find('td');
                        for (var i = 0; i < addresses.length; i++) {
                            var add = addresses[i];

                            $td.append('<p class="type">' + add.type + '</p>');
                            $td.append('<p class="data">' + add.line1 + ', ' + add.line2 + '</p>');
                            $td.append('<p class="data">' + add.city + ', ' + add.state + ', ' + add.zip + '</p>');
                            $td.append('<p class="data country">' + add.country + '</p>');
                        }
                    }
                }
            );

            dataFunctions.getEmails(EntryId).then(
                function(emails) {
                    if (emails.length === 0) {
                        $emailTr.remove();
                    }
                    else {
                        var $td = $emailTr.find('td');
                        for (var i = 0; i < emails.length; i++) {
                            var mail = emails[i];

                            $td.append('<p class="type">' + mail.type + '</p>');
                            $td.append('<p class="data">' + mail.email + '</p>');
                        }
                    }
                }
            );

            dataFunctions.getPhones(EntryId).then(
                function(phones) {
                    if (phones.length === 0) {
                        $phoneTr.remove();
                    }
                    else {
                        var $td = $phoneTr.find('td');
                        for (var i = 0; i < phones.length; i++) {
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

module.exports = {
    displayAddressBooksList: displayAddressBooksList,
    displayAddressBook: displayAddressBook,
    displayEntry: displayEntry
};
