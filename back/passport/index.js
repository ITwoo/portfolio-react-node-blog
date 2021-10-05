const passport = require('passport');

const local = require('./localStrategy'); // 내 Database에서 로그인 - 2021 10 04 ITwoo
// const kakao = require('./kakao');
const { User } = require('../models');

module.exports = () => {
  passport.serializeUser((user, done) => { // session에 로그인 정보 저장 - 2021 10 04 ITwoo
    console.log('ser', user.id)
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => { // session에 정보 확인 - 2021 10 04 ITwoo
    console.log('des', id)
    User.findOne({ where: { id }})
    .then(user => done(null, user))
    .catch(err => done(err));
  });

  local();
  // kakao(passport);
}
