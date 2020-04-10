// ***************************************************************************
// html-routes.js - file conians routes to guide users to html pages
// ***************************************************************************
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');
// brings in database models
let db = require("../models");

module.exports = function (app) {
    // GET REQUESTS
    // =============================================================
    app.get('/', (req, res) => {
        res.end('no.... nice try.');
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
            console.log('===============');
            console.log(dbUser);


            if(dbUser.password === req.body.loginpassword) {

                // ***********************************************************
                // ****** ASSUMPTION - there is only 1 user in the DB ********
                // ***********************************************************
                db.Passwords.findAll({}).then(function(dbPasswords) {
                    let passPasswords = [];
                    dbPasswords.forEach(element => {
                        passPasswords.push({
                            description: element.description,
                            username: element.userName,
                            password: element.password
                        });
                    });
                    
                    // DATA passing is working. I just refrenced {{username}} and handlebars picked it up
                    let thing = {
                        passwords: passPasswords,
                        username: dbUser.user_name  // this is the logged in username NOT a saved username/password
                    };

                    res.render("index", thing);

                }).catch((err) => {
                    res.end(err);
                });

            } else {
                // be careful with redirects. if bugs here look here.
                res.redirect('/welcome');
            }

        }).catch(() => {
            res.redirect('/welcome');
        });

    });

    app.post('/signUp',(req, res) => {

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                let userReadyForSave = {
                    first_name: req.body.firstname,
                    last_name: req.body.lastname,
                    user_name: req.body.username,
                    password: hash,
                    email: req.body.email
                };

                // create the user
                db.User.create(userReadyForSave)
                    .then((dbResults) => {
                    // res.status(201).json({
                    //     id: dbResults.dataValues.id
                    // });
                    res.status(201).render("index", dbResults);
        
                })
                .catch(() => {
                    res.status(406).send({
                        error: 'something blew up'
                    });
                });

            });
        });
        

    });

    
}