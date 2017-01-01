/**
 * AdminController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function addUser(userInfo, callback){
    UserModel.create({
        username: userInfo.login,
        githubAccount: userInfo.login,
        avatar: userInfo.avatar_url,
        nickName: userInfo.name,
        company: userInfo.company,
        blog: userInfo.blog,
        email: userInfo.email,
        bio: userInfo.bio,
        role: 'user'
    }).exec(function (err, userInfo){

        callback && callback(err, userInfo);
    });
}
function github(req, res, code){
    // 使用github登录
    GithubAuth.login(code, function(err, userInfoFromGithub) {
        if(err || !userInfoFromGithub){
            console.log(err);
            return res.serverError('拉取用户信息失败！');
        }
        // 从数据库中查找是否已登录
        UserModel.findOne({
            githubAccount: userInfoFromGithub.login
        }).exec(function(err, userInfoFromDB) {
            if(!err && userInfoFromDB) {
                // 设置登录状态
                LoginStatus.setUserSession(req, userInfoFromDB);
                return res.redirect('/catch/' + userInfoFromDB.username);
            }
            // 新增用户
            addUser(userInfoFromGithub, function(err, userInfoFromNewUser){
                if(err || !userInfoFromNewUser){
                    return res.serverError('创建用户失败！');
                }
                // 设置登录状态
                LoginStatus.setUserSession(req, userInfoFromNewUser);
                return res.redirect('/catch/' + userInfoFromNewUser.username);
            });
        });
    });
}
module.exports = {
    main: function (req, res) {
        var from = req.params.from;
        var code;
        if(from == 'github'){
            code = req.query.code;
            github(req, res, code);
        } else {
            return res.notFound('出错啦，登录站点不存在！');
        }
    }
};
