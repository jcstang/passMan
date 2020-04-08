// Alert
// alert("You are now the highest bidder.");
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


// removes message after 5 seconds

// setTimeout(function () {
//     $('.card-message').detach();
// }, 5 * 1000);



// Alert - too low
// var tooLowMessage = $('<div>').addClass('alert alert-warning')
//     .attr('role', 'alert')
//     .text('Ouch - Sorry that bid is too low.');
// $('.card-message').prepend(tooLowMessage);
// // removes message after 5 seconds
// setTimeout(function () {
//     $('.card-message').detach();
// }, 5 * 1000);


module.exports = {
    addSuccessMessage
}