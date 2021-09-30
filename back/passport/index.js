const passport = require('passport');

const local = require('./localStrategy');
// const kakao = require('./kakao');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    console.log('ser', user.id)
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log('des', id)
    User.findOne({ where: { id }})
    .then(user => done(null, user))
    .catch(err => done(err));
  });

  local();
  // kakao(passport);
}
