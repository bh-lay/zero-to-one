/**
 * AdminController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    login: function (req, res) {
        return res.view( 'admin/login', {
            title: '登录后台'
        });
    },
    index: function (req, res) {
        return res.view( 'admin/index', {
            title: '后台首页'
        });
    }
};
