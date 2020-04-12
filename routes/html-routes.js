// ***************************************************************************
// html-routes.js - file conians routes to guide users to html pages
// ***************************************************************************
const bcrypt = require('bcrypt');
const saltRounds = 10;
const path = require('path');
const helper = require('../helperFuncs');
const passport = require('passport');
// brings in database models
let db = require("../models");

module.exports = function (app) {

    // GET REQUESTS
    // =============================================================
    app.get('/', (req, res) => {
        res.end('no.... nice try.');
        // go get passwords
        // render index
        // what about the user?
    });

    // path just used to fill db with test data.
    app.get('/fillOutDB', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/fillOutDB.html"));
    });

    app.get('/welcome', (req, res) => {
        res.render("welcome");
    });

    app.get('/portal/:id', (req, res) => {
        // get passwords ownerKey
        let ownerKey = req.params.id;
        console.log('req.params.id: ' + ownerKey);
        db.User.findOne({
            where: {
                // user_name: ownerKey
                id: ownerKey
            }
        }).then((dbUser) => {
            console.log(dbUser);

            db.Passwords.findAll({
                //** conditional would go here **
            }).then(function (dbPasswords) {
                console.log('========================================= thing1');
                let passwordObjectReadyForHandlebars = helper.createPasswordObject(dbPasswords, dbUser);
                console.log(passwordObjectReadyForHandlebars);
                res.render("index", passwordObjectReadyForHandlebars);

            }).catch((err) => {
                console.log('========================================= thing2');
                res.end(err);
            });
        })
        // render index passing in the passwords. 
    });


    // POST REQUESTS
    // =============================================================
    // app.post('/login',
    //     passport.authenticate('local', {
    //         failureRedirect: '/login'
    //     }),
    //     function (req, res) {
    //         res.redirect('/');
    //     });

    // app.post('/login',
    //     passport.authenticate('local', {
    //         successRedirect: '/portal',
    //         failureRedirect: '/login',
    //         failureFlash: true
    //     })
    // );

    app.post('/login', (req, res) => {
        // passport.authenticate('local', {
        //     successRedirect: '/portal',
        //     failureRedirect: '/login',
        //     failureFlash: true
        // });
        console.log('============ inside of post /login =======');
        passport.authenticate('local', {
            successRedirect: '/portal',
            failureRedirect: '/welcome'
        });
        
        console.log('============ inside of post /login at the end=======');
    });

    // app.post('/login', (req, res) => {
    //     // search for username in MySQL

    //     db.User.findOne({
    //         where: {
    //             user_name: req.body.loginusername
    //         }
    //     })
    //     .then((dbUser) => {
    //         // user is coming here!!!!!! yay!!!!!!
    //         console.log('===============');
    //         console.log(dbUser);
    //         console.log(dbUser.password);

    //         const passwordFromDB = dbUser.password;
    //         const passwordFromInput = req.body.loginpassword;

    //         // console.log(bcrypt);

    //         // Load hash from your password DB.
    //         bcrypt.compare(passwordFromInput, passwordFromDB, function(err, result) {
    //             // result == true
    //             if(err) {
    //                 //do stuff
    //                 // res.redirect('/welcome');
    //             }

    //             if(result === true) {
    //                 // ***********************************************************
    //                 // ****** ASSUMPTION - there is only 1 user in the DB ********
    //                 // ***********************************************************
    //                 db.Passwords.findAll({
    //                     //** conditional would go here **
    //                 }).then(function(dbPasswords) {
    //                     let passwordObjectReadyForHandlebars = helper.createPasswordObject(dbPasswords, dbUser);

    //                     res.render("index", passwordObjectReadyForHandlebars);

    //                 }).catch((err) => {
    //                     res.end(err);
    //                 });

    //             } else {
    //                 //no go bro
    //                 // res.redirect('/welcome');
    //                 res.end('hash didnt work??');
    //             }

    //         });


    //         // if(dbUser.password === req.body.loginpassword) {

    //         //     db.Passwords.findAll({}).then(function(dbPasswords) {
    //         //         let passPasswords = [];
    //         //         dbPasswords.forEach(element => {
    //         //             passPasswords.push({
    //         //                 description: element.description,
    //         //                 username: element.userName,
    //         //                 password: element.password
    //         //             });
    //         //         });

    //         //         // DATA passing is working. I just refrenced {{username}} and handlebars picked it up
    //         //         let thing = {
    //         //             passwords: passPasswords,
    //         //             username: dbUser.user_name  // this is the logged in username NOT a saved username/password
    //         //         };

    //         //         res.render("index", thing);

    //         //     }).catch((err) => {
    //         //         res.end(err);
    //         //     });

    //         // } else {
    //         //     // be careful with redirects. if bugs here look here.
    //         //     res.redirect('/welcome');
    //         // }


    //     // if db didn't find user
    //     }).catch(() => {
    //         res.redirect('/welcome');
    //     });

    // });

    app.post('/signup', (req, res) => {
        let userReadyForSave = {
            first_name: req.body.firstname,
            last_name: req.body.lastname,
            user_name: req.body.username,
            password: req.body.userpassword,
            email: req.body.email
        };

        // create the user
        db.User.create(userReadyForSave)
            .then((dbCreatedUser) => {
                res.status(201).render("welcome", dbCreatedUser);

            })
            .catch((err) => {
                console.log(err);

                res.status(406).send({
                    error: 'something blew up'
                });
            });
    });


    // bcrypt version
    // =============================================================
    // app.post('/signUp', (req, res) => {
    //     const passwordInput = req.body.userpassword;
    //     console.log('##$%%$#@#$%$#');
    //     console.log(passwordInput);

    //     bcrypt.genSalt(saltRounds, function (err, salt) {
    //         bcrypt.hash(passwordInput, salt, function (err, hash) {
    //             // console.log(err);

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

    //                     // ============================================================
    //                     // TODO: Pass the passwords here instead of dbResults. how do we get passwords?
    //                     res.status(201).render("welcome", dbCreatedUser);

    //                 })
    //                 .catch((err) => {
    //                     console.log(err);

    //                     res.status(406).send({
    //                         error: 'something blew up'
    //                     });
    //                 });


    //         });
    //     });


    // });


}