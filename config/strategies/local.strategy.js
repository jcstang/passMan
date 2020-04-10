const passport = require('passport');
const {
    Strategy
} = require('passport-local');
const db = require('../../models');

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
            db.User.findOne({
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



// pluralsight
// =============================================================
// const passport = require('passport');
// const { Strategy } = require('passport-local');
// const { MongoClient } = require('mongodb');
// const debug = require('debug')('app:local.strategy');

// module.exports = function localStrategy() {
//   passport.use(new Strategy(
//     {
//       usernameField: 'username',
//       passwordField: 'password'
//     }, (username, password, done) => {
//       const url = 'mongodb://localhost:27017';
//       const dbName = 'libraryApp';
//       (async function mongo() {
//         let client;

//         try {
//           client = await MongoClient.connect(url);

//           debug('Connected correctly to server');

//           const db = client.db(dbName);
//           const col = db.collection('users');

//           const user = await col.findOne({ username });

//           if (user.password === password) {
//             done(null, user);
//           } else {
//             done(null, false);
//           }
//         } catch (err) {
//           console.log(err.stack);
//         }
//         // Close connection
//         client.close();
//       }());
//     }));
// };