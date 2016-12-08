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
    detail: function (req, res) {
        var username = req.params.username;
        getUserInfo(username, function(err, userInfo, opusList) {
            if(err){
                return res.notFound('用户不存在!');
            }
            return res.view( 'page/user-profile', {
                title: userInfo.nickName + '的个人主页',
                navigationClass: '',
                loginUser: req.session.loginUser,
                layout: 'layout/app.ejs',
                userInfo: userInfo,
                opusList: opusList
            });
        });
    }
};
