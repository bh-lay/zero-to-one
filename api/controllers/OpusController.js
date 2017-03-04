/**
 * AdminController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function getOpusInfo(opusid, callback) {
    OpusModel.findOne({
        id: opusid
    }).exec(function(err, opusInfo) {
        if(err || !opusInfo) {
            callback && callback(err || !opusInfo);
            return;
        }
        callback && callback(null, opusInfo);
    });
}
function getUserInfo(userid, callback) {
    UserModel.findOne({
        id: userid
    }).exec(function(err, userInfo){
        if (err || !userInfo) {
            callback && callback(err || !userInfo);
        } else {
            callback && callback(null, userInfo)
        }
    });
}
function getOpusDetail(opusid, callback) {
    getOpusInfo(opusid, function (err, opusInfo){
        if (err) {
            callback && callback(err);
            return
        }
        getUserInfo(opusInfo.createBy, function(err, userInfo){
            if (err) {
                callback && callback(err);
                return
            }
            callback && callback(null, opusInfo, userInfo);
        });
    });
}
module.exports = {
    detail: function (req, res) {
        var opusid = req.params.opusid;
        getOpusDetail(opusid, function (err, opusInfo, userInfo) {
            return res.view( 'page/opus-detail', {
                title: opusInfo.title || '作品页面',
                opusInfo: opusInfo,
                userInfo: userInfo,
                layout: 'layout/opus.ejs'
            });
        });

    },
    list: function (req, res) {
        OpusModel.find({
            limit: 20
        }).exec(function(err, opusList) {
            if(err) {
                return res.serverError('查找作品失败！');
            }
            return res.view( 'page/opus-list.ejs', {
                title: '发现更多好作品',
                navigationClass: 'darken',
                loginUser: req.session.loginUser,
                opusList: opusList,
                layout: 'layout/app.ejs'
            });
        });
    },
    add: function (req, res) {
        return res.view( 'page/publish', {
            title: '发布作品',
            navigationClass: 'darken',
            loginUser: req.session.loginUser,
            layout: 'layout/app.ejs'
        });
    }
};
