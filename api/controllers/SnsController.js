/**
 * AdminController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    main: function (req, res) {
        var from = req.params.from;
        var code;
        if(from == 'github'){
            code = req.query.code;
            GithubAuth.login(code, function(err, userInfo) {
                console.log(err, userInfo);
                return res.view( 'page/publish', {
                    title: '发布作品',
                    navigationClass: 'darken',
                    loginUser: req.session.loginUser,
                    layout: 'layout/app.ejs'
                });
            });
        } else {
            return res.notFound('出错啦，登录站点不存在！');
        }
    }
};
