/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  list: function (req, res) {
    UserModel.find().exec(function(err, user) {
      return res.jsonp({
        list: user
      });
    });
  },
  login: function (req, res) {
    req.session.isAdmin = true;
    return res.json({
      code: 200,
      msg: "login success"
    });
  },
  logout: function (req, res) {
    req.session.isAdmin = false;
    return res.json({
      code: 200,
      msg: "logout success"
    });
  }
};
