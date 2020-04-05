// ***************************************************************************
// Server.js - passMAN | the password manager for all
// ***************************************************************************
// ** Dependencies **
const express = require("express");


// sets up the express app
// =============================================================
const app = express();
const PORT = process.env.PORT || 8080;

// const db = require("./models");
const db = require("./models/user");


// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Directory
app.use(express.static("public"));


// Routes
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/password-routes.js")(app);


// Syncing our sequelize models and then starting our express app
// =============================================================
// db.sequelize.sync({ force: true }).then(function() {
//     app.listen(PORT, function() {
//         console.log("App listening on PORT " + PORT);
//     });
// });
app.listen(PORT, function() {
    console.log("app listening on PORT " + PORT);
    
});