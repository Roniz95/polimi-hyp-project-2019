const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const knex = require('./knexConfig').knexConn();
const bcrypt = require('bcrypt');

const options = {};
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    done(null, user);
});

passport.init();


passport.use(new LocalStrategy(options, function (username, password, done) {
    knex('users').where('username', username).first()

        .then(user => {
            if(!user) return done(null, false);
            if(!bcrypt.compareSync(password, user.password)) {
                return done(null, false)
            } else return done(null, user)
        })
        .catch(error => {
            console.log('uao')
            return done(error)
        })
}));



module.exports = passport;