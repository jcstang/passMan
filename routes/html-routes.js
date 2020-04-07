// ***************************************************************************
// html-routes.js - file conians routes to guide users to html pages
// ***************************************************************************

const path = require('path');
const express = require('express');
const router = express.Router();


// const app = express();
// // is below needed here?
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// router.use(function timeLog(req, res, next) {
//     // let printDate = chalk( Date().toString() );
//     console.log( 'html-routes Time: ', Date().toString() );
//     next();
// });

router.get("/", (req, res) => {
    res.sendFile( path.join(__dirname, "../public/home.html") );
});

router.get("/details", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/details.html"));
});


// EXPORTS
// =============================================================
module.exports = router;


// module.exports = function(app) {

//     app.get("/", (req, res) => {
//         res.sendFile( path.join(__dirname, "../public/home.html") );
//     });

//     app.get("/details", (req, res) => {
//         res.sendFile(path.join(__dirname, "../public/details.html"));
//     })

// };