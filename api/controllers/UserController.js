/**
 * AdminController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    detail: function (req, res) {
        return res.view( 'user-profile', {
            title: '用户主页'
        });
    }
};
