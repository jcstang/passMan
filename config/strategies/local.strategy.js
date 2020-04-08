const passport = require('passport');
const {
    Strategy
} = require('passport-local');

module.exports = function localStrategy() {

    // pluralsight version
    // passport.use(new Strategy({
    //     usernameField: 'username',
    //     passwordField: 'password'

    // }, (username, password, done) => {
    //     // do stuff here
    //     const user = {
    //         username,
    //         password
    //     }
    //     done(null, user);
    // }));

    // example from passport js site. 
    passport.use(new Strategy(
        function (username, password, done) {
            User.findOne({
                username: username
            }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false);
                }
                if (!user.verifyPassword(password)) {
                    return done(null, false);
                }
                return done(null, user);
            });
        }
    ));

}