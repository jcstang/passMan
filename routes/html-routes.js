// ***************************************************************************
// html-routes.js - file conians routes to guide users to html pages
// ***************************************************************************

const path = require('path');
const passport = require('passport');

module.exports = function (app) {
    
    // TODO: protect this page behind login/passport
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
        // res.end('no');
        // TODO: render main.handlebars
    });

    app.get('/main', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/home.html"));
        // TODO: render main.handlebars
    });
    
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