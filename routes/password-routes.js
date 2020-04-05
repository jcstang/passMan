let db = require("../models");

module.exports = function(app) {
    
    app.get("/api/passwords", (req, res) => {

        db.Passwords.findAll({})
            .then(function(dbPassword) {
                res.json(dbPassword);
            });
    });
};