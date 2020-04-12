const passport = require('passport');
require('./strategies/local.strategy')();

module.exports = function passportConfig(app) {
    console.log('============ inside of passport.js =======');
    app.use(passport.initialize());
    app.use(passport.session());
    
    // Stores user in session
    passport.serializeUser((user, done) => {
        console.log('============ inside of passport.js serialize user =======');
        done(null, user);
    });
    
    // Retrieves user from session
    passport.deserializeUser((user, done) => {
        console.log('============ inside of passport.js deserialize user =======');
        done(null, user);
    });


};