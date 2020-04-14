// ***************************************************************************
// password-routes.js
// ***************************************************************************
let db = require("../models");
// const helper = require("../helperFuncs");


module.exports = function (app) {

    // GET - ALL
    // =============================================================
    app.get("/api/passwords", (req, res) => {

        db.Passwords.findAll({})
            .then(function (dbPassword) {
                res.json(dbPassword);
                // TODO: handlebars ready
                // TODO: res.render stuff
                // TODO: also pass it handlebars formatted data from dbPassword
                // See below
                //TIM will attempt to work on this one


            });
    });

    // cat example
    // =============================================================
    // Create all our routes and set up logic within those routes where required.
    // router.get("/", function (req, res) {
    //     cat.all(function (data) {
    //         var hbsObject = {
    //             cats: data
    //         };
    //         console.log(hbsObject);
    //         res.render("index", hbsObject);
    //     });
    // });

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
                // future thing to do is make this handlebars ready
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
            // res.status(201).json({
            //     id: dbResults.dataValues.id
            // });
            // res.render("success");
            // res.status(201).render("index", pulling all of the data here and passing it to the view)
            // res.status(201).render("index");

            // res.redirect("/portal/1");
            // let hashedKey = 'sa;fkjsfkl;dajfsl;jsd'
            let route = `/portal/${req.body.ownerKey}`;
            // console.log(route);
            res.redirect(route);

            // res.redirect('/portal/1');



        }).catch((err) => {
            res.status(406).json({
                message: 'something blew up ',
                error: err
            });
        });
    });

    // PUT
    // =============================================================
    // app.put("/api/passwords/", (req, res) => {
    //     // console.log(req);
    //     let passwordId = req.body.id;

    //     db.Passwords.update({
    //             id: passwordId,
    //             description: req.body.description,
    //             userName: req.body.userName,
    //             password: req.body.password
    //         }
    //         , {
    //             where: {
    //                 id: passwordId 
    //             }
    //         }

    //     ).then((dbResults) => {

    //         let route = `/portal/${req.body.passId}`;
    //         res.redirect(route);

    //     }).catch((err) => {
    //         res.status(406).json({
    //             message: 'something blew up ',
    //             error: err
    //         });
    //     });
    // });


    app.put("/api/passwords/", (req, res) => {
        // console.log(req);
        db.Passwords.update({
            description: req.body.description,
            userName: req.body.userName,
            password: req.body.password
        }, {
            where: {
                id: req.body.passId
            }
        }).then((dbResults) => {
            let route = `/portal/${req.body.passId}`;
            res.redirect(route);
        }).catch((err) => {
            res.status(406).json({
                message: 'something blew up ',
                error: err
            });
        });
    });

    // DELETE
    // =============================================================
    // app.delete("/api/passwords/:id", (req, res) => {

    //     var paramsId = req.params.id
    //     // console.log(paramsId);

    //     db.Passwords.destroy({
    //         where: {
    //             id: paramsId
    //         }

    //     }).then(() => {

    //         let route = `/portal/${req.params.id}`;
    //         res.redirect(route);

    //     }).catch((err) => {
    //         res.status(406).json({
    //             message: 'something blew up ',
    //             error: err
    //         });
    //     });
    // });

    app.delete("/api/passwords/:id", (req, res) => {

        db.Passwords.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            let route = `/portal/${req.params.id}`;
            res.redirect(route);
        }).catch((err) => {
            res.status(406).json({
                message: 'something blew up ',
                error: err
            });
        });
    });
};


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