// ***************************************************************************
// html-routes.js - file conians routes to guide users to html pages
// ***************************************************************************

const path = require('path');
const passport = require('passport');
const debug = require('debug');

// brings in database models
let db = require("../models");

module.exports = function (app) {
    
    // TODO: protect this page behind login/passport
    app.get('/', (req, res) => {
        // only welcome page can go to root
        res.redirect('/welcome');
        // db.Passwords.findAll({}).then(function(dbPasswords) {
        //     // let handlebarsObject = {
        //     //     passwords: dbPasswords
        //     // };
        //     let thePasswords = [];
        //     dbPasswords.forEach(element => {
        //         // console.log(element.id);
        //         thePasswords.push({
        //             id: element.id,
        //             description: element.description,
        //             userName: element.userName,
        //             password: element.password
        //         })
                
        //     });
        //     console.log('######### thePasswords ############################');
        //     // console.log(thePasswords);
        //     // console.log('######### here is dbPasswords - original data ############################');
        //     // console.log(dbPasswords);
            
        //     res.render("index", thePasswords);
        // });
    });

    // app.get('/portal', (req, res) => {
    //     db.Passwords.findAll({}).then(function(dbPasswords) {          
    //         res.render("index", dbPasswords);
    //     });
    //     // res.json(req.user);
    // });

    app.get('/fillOutDB', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/fillOutDB.html"));
    });


    // TODO: form stuff
    // app.get('/login', (req, res) => {
    //     let routeText = {
    //         name: "login"
    //     }
    //     res.render("login-register", routeText);
    // });

    app.get('/signup', (req, res) => {
        let routeText = {
            name: "signup"
        }
        res.render("login-register", routeText);
    });

    app.get('/welcome', (req, res) => {
        res.render("welcome");
    });
    

    
    // TODO: add a login page with login.handlebars
    // app.post('/login',(req, res) => {
    //     // passport stuff here
    //     // TODO: check if the user is in DB
    //     // TODO: check if their password is correct
    //     // If those 2 pass then they can come to the home page
    //     res.redirect('/');
    // });


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