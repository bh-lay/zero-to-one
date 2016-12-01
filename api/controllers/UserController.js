/**
 * UserController
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
        } else {
            callback && callback(null, user);
        }
    });
}
module.exports = {
    detail: function (req, res) {
        var username = req.params.username;
        getUserInfo(username, function(err, userInfo) {
            if(err){
                return res.notFound('用户不存在!');
            }
            return res.view( 'user-profile', {
                title: '用户主页',
                loginUser: req.session.loginUser,
                layout: 'layout/app.ejs',
                userInfo: userInfo
            });
        });
    }
};
