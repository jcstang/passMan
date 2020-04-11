// ***************************************************************************
// html-routes.js - file conians routes to guide users to html pages
// ***************************************************************************
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');
const helper = require('../helperFuncs');
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
            console.log(dbUser.password);

            const passwordFromDB = dbUser.password;
            const passwordFromInput = req.body.loginpassword;

            // console.log(bcrypt);

            // Load hash from your password DB.
            bcrypt.compare(passwordFromInput, passwordFromDB, function(err, result) {
                // result == true
                if(err) {
                    //do stuff
                    // res.redirect('/welcome');
                }

                if(result === true) {
                    db.Passwords.findAll({}).then(function(dbPasswords) {
                        let passwordObjectReadyForHandlebars = helper.createPasswordObject(dbPasswords, dbUser.userName);

                        res.render("index", passwordObjectReadyForHandlebars);
    
                    }).catch((err) => {
                        res.end(err);
                    });

                } else {
                    //no go bro
                    // res.redirect('/welcome');
                    res.end('hash didnt work??');
                }

            });


            // if(dbUser.password === req.body.loginpassword) {

            //     // ***********************************************************
            //     // ****** ASSUMPTION - there is only 1 user in the DB ********
            //     // ***********************************************************
            //     db.Passwords.findAll({}).then(function(dbPasswords) {
            //         let passPasswords = [];
            //         dbPasswords.forEach(element => {
            //             passPasswords.push({
            //                 description: element.description,
            //                 username: element.userName,
            //                 password: element.password
            //             });
            //         });
                    
            //         // DATA passing is working. I just refrenced {{username}} and handlebars picked it up
            //         let thing = {
            //             passwords: passPasswords,
            //             username: dbUser.user_name  // this is the logged in username NOT a saved username/password
            //         };

            //         res.render("index", thing);

            //     }).catch((err) => {
            //         res.end(err);
            //     });

            // } else {
            //     // be careful with redirects. if bugs here look here.
            //     res.redirect('/welcome');
            // }


        // if db didn't find user
        }).catch(() => {
            res.redirect('/welcome');
        });

    });

    app.post('/signUp',(req, res) => {
        const passwordInput = req.body.userpassword;
        console.log('##$%%$#@#$%$#');
        console.log(passwordInput);

        bcrypt.genSalt(saltRounds, function(err, salt) {
            bcrypt.hash(passwordInput, salt, function(err, hash) {
                // console.log(err);
                
                    let userReadyForSave = {
                        first_name: req.body.firstname,
                        last_name: req.body.lastname,
                        user_name: req.body.username,
                        password: hash,
                        email: req.body.email
                    };
    
                    // create the user
                    db.User.create(userReadyForSave)
                        .then((dbCreatedUser) => {

                        // ============================================================
                        // TODO: Pass the passwords here instead of dbResults. how do we get passwords?
                        res.status(201).render("index", dbCreatedUser);
            
                    })
                    .catch((err) => {
                        console.log(err);
                        
                        res.status(406).send({
                            error: 'something blew up'
                        });
                    });
                

            });
        });
        

    });


}