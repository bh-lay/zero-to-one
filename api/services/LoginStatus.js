/**
 * Created by bh-lay on 2016/12/8.
 */
exports.setLogin = function(req, userInfo){
	//检测是否为管理员
	if( userInfo.role === "admin" ){
		req.session.isAdmin = true;
	}
	// 将用户信息存储至session
	req.session.loginUser = userInfo;
};