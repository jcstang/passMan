// ***************************************************************************
// password-routes.js
// ***************************************************************************
let db = require("../models");


module.exports = function (app) {

    // GET - ALL
    // =============================================================
    app.get("/api/passwords", (req, res) => {

        db.Passwords.findAll({})
            .then(function (dbPassword) {
                res.json(dbPassword);
            });
    });

    // GET - by id
    // =============================================================
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

    // POST
    // =============================================================
    app.post("/api/passwords", (req, res) => {
        db.Passwords.create({
            description: req.body.description,
            userName: req.body.userName,
            password: req.body.password,
            ownerKey: req.body.ownerKey
        }).then((dbResults) => {
            res.status(201).json({
                id: dbResults.dataValues.id
            });
        }).catch((err) => {
            res.status(406).send({
                message: 'something blew up ',
                error: err
            });
        });
    });

    // PUT
    // =============================================================
    app.put("/api/passwords", (req, res) => {
        db.Passwords.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then((dbPassword, error) => {
            console.log(error);
            res.json(dbPassword);
        }).catch(() => {
            res.status(500).send({
                error: "idk, something blew up"
            });
        });
    });

    // DELETE
    // =============================================================
    app.delete("/api/passwords/:id", (req, res) => {
        db.Passwords.destroy({
            where: {
                id: req.params.id
            }
        }).then((isSuccess) => {
            if (isSuccess) {
                res.status(202).send({
                    message: "success"
                });
            } else {
                res.status(404).send({
                    message: "cannot do... no findy wut you needy."
                });
            }
        }).catch(() => {
            res.status(500).send({
                error: "idk, something blew up"
            });
        });
    });


};


// ---------------
// EXAMPLES 
// ---------------
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