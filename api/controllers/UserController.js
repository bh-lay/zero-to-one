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
  add: function (req, res) {
    req.session.isAdmin = true;
    return res.view('500');
  }
};
