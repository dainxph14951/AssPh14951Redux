import expressJWT from 'express-jwt';

exports.checkAuth = (req, res, next) => {
  const isAdmin = true;
  if (isAdmin) {
    next();
  } else {
    res.redirect('/');
  }
};

export const requireSingin = expressJWT({
  secret : '123456',
  algorithms: ['HS256'],
  requestProperty: 'auth'
});
export const isAuth = (req, res, next) => {
  console.log(req.auth);
  console.log(req.profile);
  const user = req.profile && req.profile._id == req.auth._id;

  console.log(user);
  if(!user){
  return  res.status(402).json({
      messager: "bạn kg đc phép truy cập"
    })
  }
  next();
}
export const isAdmin = (req, res, next) => {
  if(req.profile.rose==0) {
    return res.status(401).json({
      messager: 'bạn không phải là admin'
    })
  }
  next();
}