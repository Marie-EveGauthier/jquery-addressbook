function displayEditEntry(EntryId) {
    dataFunctions.getEntry(EntryId).then(
        function(entry){
            $app.html('');
            console.log(EntryId);
            
            //Button that allows to edit the entry -creation
            var edit = $('<button>Edit</button>');
            $app.append(edit);
            edit.on('click', function() {
                
                
            });
            
            //main content
            $app.append('<h2>Contact informations to edit</h2>')
            $app.append('<form action="editedData.js">   
                        First Name: ('<input type="text" name="FirstName" value=entry.firstName></input>');
                        <br>
                        Last Name: ('<input type="text" name="LastName" value=entry.lastName></input>');
                        <br>
                        Birthday: ('<input type="text" name="Birthday" value=entry.birthday></input>');
                        <br>
                        ('<input type="submit" value="ENTER"></input>'); 
                        </form>');
})                        
           
//           $.ajax('https://loopback-rest-api-demo-ziad-saab.c9.io/api/Entries/' + EntryId, {
//   dataType: 'json',
//   method: 'PUT',
//   data: {firstName: , lastName: , birthday: }
// }).then(function(response) {})
// }    
