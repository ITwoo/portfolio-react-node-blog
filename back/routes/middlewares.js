/*  로그인 유무 검사 미들웨어- 2021 10 04 ITwoo */
exports.isLoggedIn = (req, res, next) => { // 로그인이 필수 일경우 - 2021 10 04 ITwoo
  if(req.isAuthenticated()){
    next();
  } else {
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {// 로그아웃된 상태가 필요할 경우 - 2021 10 04 ITwoo
  if(!req.isAuthenticated()){
    next();
  } else {
    res.redirect('/');
  }
}