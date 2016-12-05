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
    add: function (req, res) {
        return res.view( 'page/publish', {
            title: '发布作品',
            loginUser: req.session.loginUser,
            layout: 'layout/app.ejs'
        });
    }
};
