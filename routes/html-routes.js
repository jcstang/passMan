// ***************************************************************************
// html-routes.js - file conians routes to guide users to html pages
// ***************************************************************************

const path = require('path');
const passport = require('passport');

// brings in database models
let db = require("../models");

module.exports = function (app) {
    
    // TODO: protect this page behind login/passport
    app.get('/', (req, res) => {
        db.Passwords.findAll({}).then(function(dbPasswords) {
            // let handlebarsObject = {
            //     passwords: dbPasswords
            // };
            let thePasswords = [];
            dbPasswords.forEach(element => {
                // console.log(element.id);
                thePasswords.push({
                    id: element.id,
                    description: element.description,
                    userName: element.userName,
                    password: element.password
                })
                
            });
            // console.log('######### thePasswords ############################');
            // console.log(thePasswords);
            // console.log('######### here is dbPasswords - original data ############################');
            // console.log(dbPasswords);
            
            res.render("index", thePasswords);
        });
    });

    app.get('/fillOutDB', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/fillOutDB.html"));
    });

    app.get('/login', (req, res) => {
        res.render("login-register");
    });
    

    
    // TODO: add a login page with login.handlebars
    app.post('/login',(req, res) => {
        // passport stuff here
        // TODO: check if the user is in DB
        // TODO: check if their password is correct
        // If those 2 pass then they can come to the home page
        res.redirect('/');
    });


    // TODO: signup route, with adding to mysql
    app.post('/signUp',(req, res) => {
        // TODO: save filled out form to DB
        // TODO: redirect to home page.
        res.end('hi');
    });
}