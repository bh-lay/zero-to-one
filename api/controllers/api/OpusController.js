/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  list: function (req, res) {

  },
  add: function (req, res) {
    var params = req.body || {};
    OpusModel.create({
      intro: params.intro,
      title: params.title,
      cover: params.cover,
      createBy: req.session.loginUser.id,
      url: params.url,
      githubFullName: params.githubFullName
    }).exec(function (err, finn){
      if (err) {
        return res.forbidden(err);
      }
      return res.ok(finn);
    });
  }
};
