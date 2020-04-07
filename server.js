// ***************************************************************************
// Server.js - passMAN | the password manager for all
// ***************************************************************************
// ** Dependencies **
const express = require("express");
const debug = require("debug")('server');
const morgan = require('morgan');
const htmlRoutes = require("./routes/html-routes.js");


// sets up the express app
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// brings in database models
let db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(morgan('dev'));

// Static Directory
app.use(express.static("public"));


// Routes
// =============================================================
app.use('/', htmlRoutes);
// require("./routes/html-routes.js")(app);
require("./routes/password-routes.js")(app);
require("./routes/user-routes.js")(app);




// Syncing our sequelize models and then starting our express app
// =============================================================
db.sequelize.sync({
    force: true
}).then(function () {
    app.listen(PORT, function () {
        debug('server.js listening on port: ' + PORT);
    });
});
// app.listen(PORT, function() {
//     console.log("app listening on PORT " + PORT);
//     debug('hello!');

// });