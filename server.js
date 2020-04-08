// ***************************************************************************
// Server.js - passMAN | the password manager for all
// ***************************************************************************
// ** Dependencies **
const path = require('path');
const express = require("express");
const debug = require("debug")('server');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// sets up the express app
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// TODO: implement PASSPORT.JS
// TODO: come up with more todos for that
// Jacob S. is working on this currently. 


// brings in database models
let db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({ secret: 'new new york'}));

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


// TODO: set the template engine to handlebars
// TODO: npm installs and such. requires and such.
// TODO: specifiy the default layout handlebars should use



// Syncing our sequelize models and then starting our express app
// =============================================================
db.sequelize.sync({
    force: true
}).then(function () {
    app.listen(PORT, function () {
        // debug('server.js listening on port: ' + PORT);
        debug(`server.js listening on port: ${PORT}`);
    });
});
// app.listen(PORT, function() {
//     console.log("app listening on PORT " + PORT);
//     debug('hello!');

// });
