/*  로그인 유무 검사 미들웨어- 2021 10 04 ITwoo */
exports.isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()){
    next();
  } else {
    console.log('error')
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if(!req.isAuthenticated()){
    next();
  } else {
    res.redirect('/');
  }
}