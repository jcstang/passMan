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
    }

    $.post("/api/users/new", newUser)
        .then(function (data, status) {
            // success
            console.log(`success, new id: ${data.id}`);  
        }).catch((err) => {
            // error
            console.log('error man');
        });

    // $.post("/api/users/new", newUser, function(data, status) {

    // });


    function displayMessage(msgType) {
        // TODO: add some sort of cool dropdown status
        // TODO: make the message go away
        console.log(msgType);
    }

    console.log('end of jquery file.')
});