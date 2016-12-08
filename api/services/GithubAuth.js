/**
 * @author bh-lay
 */
var https = require('https');
var querystring = require('querystring');

function getToken(code, callback){
	var postData = querystring.stringify({
		client_id: sails.config.githubSDK['client_id'],
		client_secret: sails.config.githubSDK['client_secret'],
		code: code,
		redirect_uri: sails.config.githubSDK['redirect_uri']
	});
	var request = https.request({
		hostname: 'github.com',
		port: 443,
		path: '/login/oauth/access_token',
		method: 'POST',
		headers: {
			'Content-Type' : 'application/x-www-form-urlencoded',
			'User-Agent' : 'L-plain-text',
			'Content-Length' : postData.length
		}
	}, function(resp) {
		var res_data = '';
		resp.on('data', function(d) {
			res_data += d;
		}).on('end', function() {
			var res_json = querystring.parse(res_data);
			var err = null;
			if(res_json.error){
				err = 'error';
			}
			callback&&callback(err, res_json);
		});
	});
	request.write(postData);
	request.end();
	request.on('error', function(e) {
		callback&&callback(e,null);
	});
}
function getUserInfo(accessToken, callback){

	var getDataStr = querystring.stringify({
		access_token: accessToken
	});

	//console.log('get userinfo');
	//console.log(getDataStr);
	var request = https.request({
		hostname: 'api.github.com',
		port: 443,
		path: '/user?' + getDataStr,
		method: 'GET',
		headers: {
			'Content-Type' : 'text/html',
			'User-Agent' : 'L-plain-text',
		}
	}, function(resp) {
		var res_data = '';
		resp.on('data', function(d) {
			res_data += d;
		}).on('end', function() {
			var res_json = querystring.parse(res_data);
			var err = null;
			if(res_json.error){
				err = 'error';
			}

			res_json = JSON.parse(res_data);
			callback&&callback(err, res_json);
		});
	});

	request.on('error', function(e) {
		callback && callback(e,null);
	});

	request.end();
}

exports.getToken = getToken;
exports.getUserInfo = getUserInfo;
exports.login = function(code, callback){
	function error(){
		callback && callback('auth error');
	}
	if( !code || code.length < 5 ){
		return error();
	}
	getToken(code, function(err, data){
		if(err){
			return error();
		}
		getUserInfo(data.access_token, function(err, userInfo){
			if(err){
				return error();
			}
			callback && callback(null, userInfo);
		});
	});
};