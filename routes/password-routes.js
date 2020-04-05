let db = require("../models");

module.exports = function (app) {

    app.get("/api/passwords", (req, res) => {

        db.Passwords.findAll({})
            .then(function (dbPassword) {
                res.json(dbPassword);
            });
    });


    app.get("/api/passwords/:id", function (req, res) {
        db.Passwords.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then(function (dbPassword) {
                res.json(dbPassword);
            });
    });

    app.post("/api/passwords/new", (req, res) => {
        console.log(req.body);
        
        db.Passwords.create({
            description: req.body.description,
            userName: req.body.userName,
            password: req.body.password,
            ownerKey: req.body.ownerKey
        }).then((dbResults) => {
            res.status(201).json({ id: dbResults.dataValues.id });
        }).catch(() => {
            console.log('im here at catch!!!!!!!!');
            res.status(406).send({ error: 'something blew up' });
        });
    });
    // Add a chirp
    // app.post("/api/new", function (req, res) {

    //     Chirp.create({
    //         author: req.body.author,
    //         body: req.body.body,
    //         created_at: req.body.created_at
    //     }).then(function (results) {
    //         // `results` here would be the newly created chirp
    //         res.end();
    //     });

    // });





    // client side js
    // =============================================================
    // Make a newChirp object
    // var newChirp = {
    //     author: $("#author").val().trim(),
    //     body: $("#chirp-box").val().trim(),
    //     created_at: moment().format("YYYY-MM-DD HH:mm:ss")
    // };

    // console.log(newChirp);

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




};