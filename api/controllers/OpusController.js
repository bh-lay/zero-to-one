/**
 * AdminController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    detail: function (req, res) {
        OpusModel.find().exec(function(err, user) {
            return res.jsonp({
                list: user
            });
        });
        return res.view( 'page/opus-detail', {
            title: '作品页面'
        });
    }
};
