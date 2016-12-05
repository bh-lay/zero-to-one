/**
 * isLogin
 *
 *
 */
module.exports = function(req, res, next) {

  // 检查是否已登录
  if ( req.session.loginUser && req.session.loginUser.username ) {
    return next();
  }

  return res.forbidden('请先登录！');
};
