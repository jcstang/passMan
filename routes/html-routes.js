// ***************************************************************************
// html-routes.js - file conians routes to guide users to html pages
// ***************************************************************************

const path = require('path');


module.exports = function(app) {

    app.get("/", (req, res) => {
        res.sendFile( path.join(__dirname, "/index.html") );
    });

};