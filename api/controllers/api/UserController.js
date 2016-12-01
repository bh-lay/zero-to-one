/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var crypto = require('crypto');

function passwordToHash( text ){
  var password = String( text ),
      salt = password.substr(0,3).toUpperCase();
  return crypto.createHash('sha256').update( password + '-' + salt ).digest('hex');
}
module.exports = {
  list: function (req, res) {
    UserModel.find().exec(function(err, user) {
      return res.jsonp({
        list: user
      });
    });
  },
  login: function (req, res) {
    var username = req.body.username,
        password = req.body.password;

    if( !username || !password ){
      return res.json({
        code: 201,
        msg: "missing params"
      });
    }

    UserModel.findOne({
      username: username,
      password: passwordToHash( password )
    }).exec(function(err, user) {
      if( err || !user ){
        return res.jsonp({
          code: 202,
          msg: "login failed"
        });
      }
      //检测是否为管理员
      if( user.role === "admin" ){
        req.session.isAdmin = true;
      }
      // 将用户信息存储至session
      req.session.loginUser = user;
      return res.jsonp({
        code: 200,
        msg: "login succes",
        user: user
      });
    });
  },
  logout: function (req, res) {
    req.session.isAdmin = false;
    req.session.loginUser = null;
    return res.json({
      code: 200,
      msg: "logout success"
    });
  }
};
