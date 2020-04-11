let db = require("../models");
const bcrypt = require('bcrypt');

module.exports = function (app) {

    // GET - all
    // =============================================================
    app.get("/api/users", (req, res) => {
        db.User.findAll({})
            .then((dbUser) => {
                res.json(dbUser);
            });

    });

    // GET - by id
    // =============================================================
    app.get("/api/users/:id", (req, res) => {
        db.User.findOne({
                where: {
                    id: req.params.id
                }
            })
            .then((dbUser) => {
                res.json(dbUser);
            });
    });

    // POST
    // =============================================================
    app.post("/api/users/new", (req, res) => {
        // const saltRounds = 10;
        // let passwordInput = req.body.user_name

        // bcrypt.genSalt(saltRounds, function(err, salt) {
        //     bcrypt.hash(passwordInput, salt, function(err, hash) {
        //         // console.log(err);
                
        //             let userReadyForSave = {
        //                 first_name: req.body.firstname,
        //                 last_name: req.body.lastname,
        //                 user_name: req.body.username,
        //                 password: hash,
        //                 email: req.body.email
        //             };
    
        //             // create the user
        //             db.User.create(userReadyForSave)
        //                 .then((dbCreatedUser) => {
        //                 // ============================================================
        //                 // TODO: Pass the passwords here instead of dbResults. how do we get passwords?
        //                 // res.status(201).render("index", dbCreatedUser);
                        
            
        //             })
        //             .catch((err) => {
        //                 console.log(err);
                        
        //                 res.status(406).send({
        //                     error: 'something blew up'
        //                 });
        //             });
                

        //     });
        // });



        db.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
            password: req.body.password,
            email: req.body.email
        }).then((dbResults) => {
            res.status(201).json({
                id: dbResults.dataValues.id
            });
        }).catch(() => {
            res.status(406).send({
                error: 'something blew up'
            });
        });

    });

    // PUT
    // =============================================================
    app.put("/api/users", (req, res) => {
        db.User.update(req.body, {
            where: {
                id: req.body.id
            }
        }).then((dbUser) => {
            res.json(dbUser);
        }).catch(() => {
            res.status(500).send({
                error: "idk, something blew up"
            });
        });
    });

    // DELETE
    // =============================================================
    app.delete("/api/users/:id", (req, res) => {
        db.User.destroy({
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
        });
    });


};