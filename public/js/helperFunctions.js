// ***************************************************************************
// helperFunctions.js
// front end JS to place helper functions to be used in the browser
// ***************************************************************************


function helperFunctions() {
    var successMessage = $('<div>').addClass('alert alert-success')
        .attr('role', 'alert')
        .text('Success - YOU are the highest bidder.');
    $('.card-message').prepend(successMessage);
    
    function addSuccessMessage() {
        let successMessage = $('<div>').addClass('alert alert-success')
            .attr('role', 'alert')
            .text('Success - YOU are the highest bidder.');
        $('.card-message').prepend(successMessage);
    
        setTimeOutOn('card-message', 5);
    }
    
    function setTimeOutOn(htmlClass, seconds) {
        setTimeout(function () {
            $(`.${htmlClass}`).detach();
        }, seconds * 1000);
    }

}

module.exports = helperFunctions();

// module.exports = {
//     addSuccessMessage
// }