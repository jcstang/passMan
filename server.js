// ***************************************************************************
// Server.js - passMAN | the password manager for all
// ***************************************************************************
// ** Dependencies **
const path = require('path');
const express = require("express");
const debug = require("debug")('server');
// const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
// const methodOverride = require('method-override');

// sets up the express app
// =============================================================
const app = express();
const PORT = process.env.PORT || 8181;

// PHASE 2
// 1. more types of things to save. dates. text.
// 2. implement passport js.


// brings in database models
let db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
// app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
    secret: 'new new york'
}));
// app.use(methodOverride('_method'));

require('./config/passport.js')(app);

// Static Directory
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

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