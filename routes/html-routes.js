// ***************************************************************************
// html-routes.js - file conians routes to guide users to html pages
// ***************************************************************************

const path = require('path');

// brings in database models
let db = require("../models");

module.exports = function (app) {
    
    // GET REQUESTS
    // =============================================================
    app.get('/', (req, res) => {
        // only welcome page can go to root
        res.redirect('/welcome');
    });

    // path just used to fill db with test data.
    app.get('/fillOutDB', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/fillOutDB.html"));
    });

    app.get('/welcome', (req, res) => {
        res.render("welcome");
    });


    // POST REQUESTS
    // =============================================================
    app.post('/login', (req, res) => {

        // search for username in MySQL
        db.User.findOne({
            where: {
                user_name: req.body.loginusername
            }
        })
        .then((dbUser) => {
            // user is coming here!!!!!! yay!!!!!!
            if(dbUser.password === req.body.loginpassword) {

                // TODO: ANDREW - this is what is rendering index.handlebars. 
                // === get passwords and render index passing in the data ====
                db.Passwords.findAll({}).then(function(dbPasswords) {   
                    // TODO: ?? change the data to make handlebars happy????
                    
                    

                    res.render("index", dbPasswords);
                });


                res.render();
            }

            res.redirect('/welcome');

        }).catch(() => {
            res.redirect('/welcome');
        });

    });

    app.post('/signUp',(req, res) => {
        console.log(req.body);

        // passport.authenticate('local', {
        //     successRedirect: '/profile',
        //     failureRedirect: '/failed'
        // });

        db.User.create({
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            user_name: req.body.username,
            password: req.body.userpassword,
            email: req.body.email

        }).then((dbResults) => {
            // res.status(201).json({
            //     id: dbResults.dataValues.id
            // });
            res.status(201).json({
                id: dbResults.dataValues.id
            });
            // res.redirect('/portal');

        }).catch(() => {
            res.status(406).send({
                error: 'something blew up'
            });
        });

    });
}