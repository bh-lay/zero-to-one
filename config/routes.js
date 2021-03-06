/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

	'get /': 'HomeController.detail',
	/**
	 * 前台页面
	 */
	// 发布作品
	'get /publish': 'OpusController.add',
	// 用户l列表页
	'get /catch': 'userController.list',
	// 用户首页
	'get /catch/:username': 'userController.detail',
	// 作品列表
	'get /try': 'OpusController.list',
	// 作品页面
	'get /try/:opusid': 'OpusController.detail',

	/**
	 * 设置页面
 	 */
	// 个人信息设置
	'get /settings/profile': 'SettingsController.profile',

	// SNS
	'get /sns/:from': 'SnsController.main',

	/**
	 * 后台页面
	 */
	'get /admin/login': 'AdminController.login',
	'get /admin/index': 'AdminController.index',

	/**
	 * 	异步数据
	 */
	// 登录登出
	'post /api/user/login': 'api/UserController.login',
	'post /api/user/logout': 'api/UserController.logout',
	// 修改个人信息
	'post /api/user/update': 'api/UserController.update',

	// 作品
	'post /api/opus/add': 'api/OpusController.add',
	'post /api/opus/addCover': 'api/OpusController.addCover'
};
