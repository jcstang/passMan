/* eslint-disable no-undef */
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

    // listen for edit button
    // on click of update button {
        // $.put("api/passwords", {
	//"id": 1
	//"description": "updated description text"
//})

    //}

    let newUser = {
        first_name: "Peter",
        last_name: "Quill",
        user_name: "starlord227",
        email: "coolguy@nova.com"
    };

    // /api/users?q=joe
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

        console.log(newPassword);
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
        
        if(msgType === 'success') {
            addSuccessMessage('card-message', 'Saved! See you CAN do things.');
        }
    }
    
    console.log('end of jquery file.')
});


// ***************************************************************************
// helper functions
// ***************************************************************************

function addSuccessMessage(htmlClass, message) {
    let successMessage = $('<div>').addClass('alert alert-success')
    .attr('role', 'alert')
    .text(message);
    $(`.${htmlClass}`).prepend(successMessage);
    
    setTimeOutOn(htmlClass, 5);
}

function setTimeOutOn(htmlClass, seconds) {
    setTimeout(function () {
        $(`.${htmlClass}`).detach();
    }, seconds * 1000);
}

