/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    detail: function (req, res) {
        return res.view( 'page/home.ejs', {
            title: 'i-fe',
            loginUser: req.session.loginUser,
            layout: 'layout/app.ejs'
        });
    }
};
