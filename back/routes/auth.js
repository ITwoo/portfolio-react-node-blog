/* 회원 가입, 로그인, 로그아웃 처리 라우터 - 2021 10 04 ITwoo*/
const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Post } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => { // 회원가입 - 2021 10 04 ITwoo
  const { username, email, password } = req.body;
  console.log(username, email, password)
  try {
    const exUser = await User.findOne ({ where: { email }});
    if (exUser){
      req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.status(401).send('이미 가입된 이메일입니다.');
    }
    const hash = await bcrypt.hash(password, 12);
    await User.create({
      username,
      email,
      password: hash,
    });
    return res.redirect('/');
  }
  catch (error) {
    console.error(error);
    return next(error);
  }
});

router.post('/login', isNotLoggedIn, (req, res, next) => { // 로그인 - 2021 10 04 ITwoo
  passport.authenticate('local', (authError, user, info) => { //custom callback, 회원 확인 (회원가입에러, 유저 정보, 메세지정보) - 2021 10 06 ITwoo
    if(authError) {
      console.error(authError);
      return next(authError);
    }
    if(!user) {
      req.flash('loginError', info.message);
      return res.status(401).send(info);
    }
    return req.login(user, async (loginError) =>{
      if(loginError) {
        console.error(loginError);
        return next(loginError);
      }
      const fullUserWithoutPassword = await User.findOne({
        where: { id: user.id },
        attributes: {
          exclude: ['password']
        },
        include: [{
          model: Post,
          attributes: ['id'],
        },]
      })
      return res.status(200).json(fullUserWithoutPassword);
    });
  })(req, res, next);
});

router.delete('/logout', isLoggedIn, (req, res) =>{ // 로그아웃 - 2021 10 04 ITwoo
  req.logout();
  req.session.destroy();
  res.status(200).send('LOGOUT')
});
module.exports = router;