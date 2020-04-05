let db = require("../models");

module.exports = function(app) {
    
    app.get("/api/users", (req, res) => {
        db.User.findAll({})
            .then((dbUser) => {
                res.json(dbUser);
            });

    });
};