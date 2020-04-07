// ***************************************************************************
// home.js - this file is for js running on the client page
// ***************************************************************************


$(document).ready(function () {
    console.log('jquery loaded.');

    // var newPassword = {
    //     description: "password Thingy",
    //     userName: "blah@something.com",
    //     password: "ILikePIe",
    //     ownerKey: 3
    // };

    let newUser = {
        first_name: "Peter",
        last_name: "Quill",
        user_name: "starlord227",
        email: "coolguy@nova.com"
    };

    
    $.post("/api/users/new", newUser)
    .then(function (data) {
        // success
        console.log(`success, new id: ${data.id}`);
        displayMessage('success');  
        let newPassword = {
            description: 'facebooks',
            userName: 'starlord',
            password: 'password123',
            ownerKey: data.id
        };

        insertPassword(newPassword);

    }).catch(() => {
        // error
        console.log('error man');
        displayMessage('error');
    });

    function insertPassword(passedData) {
        $.post("/api/passwords", passedData)
            .then((data) => {
                console.log(`success, new id: ${data.id}`);
                displayMessage('success');
            }).catch(() => {
                console.log('error man');
                displayMessage('error');
            });
    }
    
    
    function displayMessage(msgType) {
        // TODO: add some sort of cool dropdown status
        // TODO: make the message go away
        console.log(msgType);
    }

    console.log('end of jquery file.')
});