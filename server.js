// ***************************************************************************
// Server.js - passMAN | the password manager for all
// ***************************************************************************
// ** Dependencies **
const path = require('path');
const express = require('express');
const debug = require('debug')('server');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const flash = require('connect-flash');
// sets up the express app
// =============================================================
const app = express();
const PORT = process.env.PORT || 8181;
// brings in database models
let db = require("./models");


app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'new new york'
}));
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(passport.initialize());
// app.use(passport.session());
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.json());
app.use(flash());
app.use(cookieParser());

require('./config/passport.js')(app);

// passport.use(new LocalStrategy(
//     function(username, password, done) {
//         db.User.findOne({
//             userName: username
//         }, function(err, user) {
//             if (err) { return done(err); }
//             if (!user) {
//                 return done(null, false, {message: 'incorrect username.'});
//             }
//             if(!user.validPassword(password)) {
//                 return done(null, false, { message: 'incorrect password' });
//             }

//             return done(null, user);
//         });
//     }
// ));

// passport.serializeUser((user, done) => {
//     done(null, user);
// });

// // retrieves user from session
// passport.deserializeUser((user, done) => {
//     done(null, user);
// });



// Static Directory
// app.use(express.static("public"));

// Routes
// =============================================================
// app.use('/', htmlRoutes);
require("./routes/html-routes.js")(app);
require("./routes/password-routes.js")(app);
require("./routes/user-routes.js")(app);

let expressHandlebars = require("express-handlebars");

app.engine("handlebars", expressHandlebars({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");

//Below is a link for partials setup
//https://stackoverflow.com/questions/16385173/node-js-express-handlebars-js-partial-views



// Syncing our sequelize models and then starting our express app
// =============================================================
db.sequelize.sync({
    force: false
}).then(function () {
    app.listen(PORT, function () {
        debug(`server.js listening on port: ${PORT}`);
    });
});


module.exports = app;