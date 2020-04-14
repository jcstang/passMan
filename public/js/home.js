/* eslint-disable no-undef */
// ***************************************************************************
// home.js - this file is for js running on the client page
// ***************************************************************************

$(document).ready(function () {
    console.log('jquery loaded.');

    $("#updateButton").on("click", function(event) {
        // let updateObject = {
        //     id: 1,
        //     description: "facebook after edits have been made"
        // }

        // console.log($("#updateButton").attr("data-id"));
        event.preventDefault;

        let updateObject = {
            id: $("#updateButton").attr("data-id"),
            description: $("#desc-id").val(),
            userName: $("#username-id").val(),
            password: $("#password-id").val()
        }
    
        $.ajax({
            url: '/api/passwords',
            type: 'PUT',
            data: updateObject,
            success: function(result) {
                console.log(result);
                
            }
        });

    });

    
    console.log('end of jquery file.')
});

