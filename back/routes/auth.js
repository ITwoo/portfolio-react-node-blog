const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User, Post } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(username, email, password)
  try {
    const exUser = await User.findOne ({ where: { email }});
    if (exUser){
      req.flash('joinError', '이미 가입된 이메일입니다.');
      return res.redirect('/join');
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

router.post('/login', isNotLoggedIn, (req, res, next) => {
  passport.authenticate('local', (authError, user, info) => { //custom callback
    console.log(user)
    console.log(info)
    console.log(authError);
    if(authError) {
      console.error(authError);
      return next(authError);
    }
    if(!user) {
      console.log('a')
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

router.get('/logout', isLoggedIn, (req, res) =>{
  req.logout();
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;