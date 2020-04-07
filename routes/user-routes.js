let db = require("../models");

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
                res.json(dbUser)
            });
    });

    // POST
    // =============================================================
    app.post("/api/users/new", (req, res) => {
        db.User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            user_name: req.body.user_name,
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
    app.get("/api/users/:id", (req, res) => {
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