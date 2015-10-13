// Add foundation dynamic functionality on page
$(document).foundation();

// Set the API base url
var API_URL = "https://loopback-rest-api-demo-ziad-saab.c9.io/api";



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


module.exports = {
    getAddressBooks: getAddressBooks,
    getAddressBook: getAddressBook,
    getEntries:getEntries,
    getEntry: getEntry,
    getAddresses: getAddresses,
    getEmails: getEmails,
    getPhones: getPhones
    
};


