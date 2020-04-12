const passport = require('passport');
const {
    Strategy
} = require('passport-local');
const db = require('../../models');
// const {
//     MongoClient
// } = require('mongodb');
// const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy() {
    passport.use(new Strategy({
        usernameField: 'userName',
        passwordField: 'password'
    }, (userName, password, done) => {
        console.log('============ inside of post local.strategy.js file =======');
        // const url = 'mongodb://localhost:27017';
        // const dbName = 'libraryApp';
        
        db.User.findOne({
            where: {
                user_name: userName
            }
        })
        .then((dbUser) => {
            if(!dbUser) {
                return done(null, false, {message: 'incorrect username'});
            }
            if (!dbUser.validPassword(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            // res.json(dbUser);
            console.log('============ inside of post local.strategy.js file inside of db.user.findone =======');
            if(dbUser.password === password) {
                done(null, dbUser);
            } else {
                done(null, false);
            }
        }).catch((error) => {
            done(error);
            console.log(error.stack);
        });



        // (async function mongo() {
        //     let client;

        //     try {
        //         client = await MongoClient.connect(url);

        //         debug('Connected correctly to server');

        //         const db = client.db(dbName);
        //         const col = db.collection('users');

        //         const user = await col.findOne({
        //             userName
        //         });

        //         if (user.password === password) {
        //             done(null, user);
        //         } else {
        //             done(null, false);
        //         }
        //     } catch (err) {
        //         console.log(err.stack);
        //     }
        //     // Close connection
        //     client.close();
        // }());


    }));
};