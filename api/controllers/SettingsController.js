/**
 * SettingsController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function getUserInfo(username, callback) {
    UserModel.findOne({
        username: username
    }).exec(function(err, user) {
        if(err || !user) {
            callback && callback(err || !user);
            return;
        }
        OpusModel.find({
            createBy: user.id
        }).exec(function(err, opusList) {
            if(err || !user) {
                callback && callback(err || !opusList);
                return;
            }
            callback && callback(null, user, opusList);
        });
    });
}
module.exports = {
    profile: function (req, res) {
        return res.view( 'page/settings/profile', {
            title: '个人信息设置',
            navigationClass: 'darken',
            loginUser: req.session.loginUser,
            layout: 'layout/app.ejs'
        });
    }
};
