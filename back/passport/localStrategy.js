const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = () => {
  passport.use(new LocalStrategy({ //DB에 접근해서 회원 정보 확인 - 2021 10 04 ITwoo
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      console.log(email, password)
      const exUser = await User.findOne({ where: { email }});
      if (exUser) {
        const result = await bcrypt.compare(password, exUser.password);
        if (result) {
          done(null, exUser);
        } else {
          done(null, false, { messae: '비밀번호가 일치하지 않습니다.'});
        }
      } else {
        done(null, false, { message: '가입되지 않은 회원입니다.'})
      }
    } catch (error) {
      console.error(error);
      done(error);
    }
  }))
}