$(document).ready(function() {
    
    var newPassword = {
        description: "password Thingy",
        userName: "blah@something.com",
        password: "ILikePIe"
    };

    $.post("/api/passwords/new", newPassword)
        .then(function(results) {
            console.log(results);
            
        });

    // // Send an AJAX POST-request with jQuery
    // $.post("/api/new", newChirp)
    //     // On success, run the following code
    //     .then(function () {

    //         var row = $("<div>");
    //         row.addClass("chirp");

    //         row.append("<p>" + newChirp.author + " chirped: </p>");
    //         row.append("<p>" + newChirp.body + "</p>");
    //         row.append("<p>At " + moment(newChirp.created_at).format("h:mma on dddd") + "</p>");

    //         $("#chirp-area").prepend(row);

    //     });
});