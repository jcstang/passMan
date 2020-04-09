/* eslint-disable no-undef */
// ***************************************************************************
// home.js - this file is for js running on the client page
// ***************************************************************************

$(document).ready(function () {
    console.log('jquery loaded.');



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
        console.log(`success, new user id: ${data.id}`);
        // displayMessage('success');  
        let newPassword = {
            description: 'facebooks',
            userName: 'starlord',
            password: 'password123',
            ownerKey: data.id
        };

        console.log(newPassword);
        // insertPassword(newPassword);
        $.post("/api/passwords", newPassword)
            .then((data) => {
                console.log(`success, new id: ${data.id}`);
                // displayMessage('success');
            }).catch(() => {
                console.log('error man on passwords');
                // displayMessage('error');
            });
            // second password for db
            $.post("/api/passwords", newPassword)
            .then((data) => {
                console.log(`success, new id: ${data.id}`);
                // displayMessage('success');
            }).catch(() => {
                console.log('error man on passwords');
                // displayMessage('error');
            });

    }).catch(() => {
        // error
        console.log('error man, on the user');
        // displayMessage('error');
    });

    // function insertPassword(passedData) {
    //     $.post("/api/passwords", passedData)
    //         .then((data) => {
    //             console.log(`success, new id: ${data.id}`);
    //             displayMessage('success');
    //         }).catch(() => {
    //             console.log('error man');
    //             displayMessage('error');
    //         });
    // }

    



    
    console.log('end of jquery file.')
});


