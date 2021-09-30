exports.isLoggedIn = (req, res, next) => {
  // console.log(req.isAuthenticated())
  // console.log(req.user)
  if(req.isAuthenticated()){
    next();
  } else {
    console.log('error')
    res.status(403).send('로그인 필요');
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  // console.log(req.isAuthenticated())
  if(!req.isAuthenticated()){
    next();
  } else {
    res.redirect('/');
  }
}