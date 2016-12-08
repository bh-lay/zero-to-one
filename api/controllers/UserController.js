/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var moment = require('moment');

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
    },
    list: function (req, res) {
        var username = req.params.username;
        UserModel.find({
            limit: 20
        }).exec(function(err, userList) {
            if(err) {
                return res.serverError('查找用户失败！');
            }
            // 调整时间格式
            userList.forEach(function (item) {
                item.createdAt = moment(item.createdAt).format('YYYY-M-D');
            });
            return res.view( 'page/user-list', {
                title: '发现更多好码农',
                navigationClass: 'darken',
                loginUser: req.session.loginUser,
                layout: 'layout/app.ejs',
                userList: userList
            });
        });
    }
};
