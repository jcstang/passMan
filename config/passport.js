const passport = require('passport');
require('./strategies/local.strategy');

// example from passport js site. 
// passport.use(new LocalStrategy(
//     function (username, password, done) {
//         User.findOne({
//             username: username
//         }, function (err, user) {
//             if (err) {
//                 return done(err);
//             }
//             if (!user) {
//                 return done(null, false);
//             }
//             if (!user.verifyPassword(password)) {
//                 return done(null, false);
//             }
//             return done(null, user);
//         });
//     }
// ));



module.exports = function passportConfig(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    // stores user in session
    passport.serializeUser((user, done) => {
        done(null, user);
    });

    // retrieves user from session
    passport.deserializeUser((user, done) => {
        done(null, user);
    });


};