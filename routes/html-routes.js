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
        // res.sendFile(path.join(__dirname, "../public/home.html"));
        // res.end('no');
        // TODO: render main.handlebars
        // db.Passwords.all((data) => {
        //     let handlebarsObject = {
        //         passwords: data
        //     }
        //     console.log(handlebarsObject);
        //     res.render("index", handlebarsObject);
        // });
        db.Passwords.findAll({}).then(function(dbPasswords) {
            // let handlebarsObject = {
            //     passwords: dbPasswords
            // };
            let thePasswords = [];
            dbPasswords.forEach(element => {
                console.log(element.id);
                thePasswords.push({
                    id: element.id,
                    description: element.description,
                    userName: element.userName,
                    password: element.password
                })
                
            });
            console.log('######### thePasswords ############################');
            console.log(thePasswords);
            console.log('######### here is dbPasswords ############################');
            console.log(dbPasswords);
            
            res.render("index", thePasswords);
        });
    });

    app.get('/fillOutDB', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/fillOutDB.html"));
    });



    // app.get('/main', (req, res) => {
    //     res.sendFile(path.join(__dirname, "../public/main.html"));
    //     // TODO: render main.handlebars
    // });
    

    
    // TODO: add a login page with login.handlebars
    app.post('/login',
        passport.authenticate('local', {
            failureRedirect: '/login'
        }),
        function (req, res) {
            res.redirect('/');
        });


    // TODO: signup route, with adding to mysql
    app.post('/signUp',(req, res) => {
        console.log(req.body);
        res.json(req.body);
    });
}