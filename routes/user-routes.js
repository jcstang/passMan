let db = require("../models");

module.exports = function(app) {
    
    app.get("/api/users", (req, res) => {
        db.User.findAll({})
            .then((dbUser) => {
                res.json(dbUser);
            });

    });

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

};