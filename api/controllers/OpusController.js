/**
 * AdminController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    detail: function (req, res) {
        return res.view( 'page/opus-detail', {
            title: '作品页面'
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
