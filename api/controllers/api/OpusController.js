/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
var path = require('path');

module.exports = {
  list: function (req, res) {

  },
  add: function (req, res) {
    var params = req.body || {};
    OpusModel.create({
      intro: params.intro,
      title: params.title,
      cover: params.cover,
      createBy: req.session.loginUser.id,
      url: params.url,
      githubFullName: params.githubFullName
    }).exec(function (err, finn){
      if (err) {
        return res.forbidden(err);
      }
      return res.ok(finn);
    });
  },
  addCover: function (req, res) {
    req.file('cover').upload({
      // 上限10M ~10MB
      maxBytes: 10000000,
    },function (err, uploadedFiles) {
      // var responseJSON = {
      //   code: 0
      //   // url: ''
      // };
      if (err) {
        return res.negotiate({
          code: 201
        });
      }

      // If no files were uploaded, respond with an error.
      if (uploadedFiles.length === 0){
        return res.badRequest({
          code: 202,
          msg: '没有上传文件'
        });
      }
      var file = uploadedFiles[0];
      var extensionMatch = file.filename.match(/(?:\.)[^\.]+$/);
      // 上传文件没有后缀名
      if(!extensionMatch){
        return res.badRequest({
          code: 203,
          msg: '上传文件没有有效的后缀名'
        });
      }

      var randomID = (new Date().getTime()*100000 + Math.ceil( Math.random() * 100000 )).toString(36);
      // 动态生成新文件
      var newFilename = randomID + extensionMatch[0].toLocaleLowerCase();
      // 文件相对根目录的路径
      var fileRelativePath = path.join(sails.config.upload.avatarPath, newFilename);
      // 文件存储目录
      var newFilePath = path.join(sails.config.upload.root, fileRelativePath);

      // 移动临时文件至新的目录
      fs.rename(file.fd, newFilePath, function(){
        if(err){
          return res.ok({
            code: 204,
            msg: '移动文件失败'
          });
        }
        return res.ok({
          code: 0,
          url: sails.config.upload.domain + fileRelativePath
        });
      });
    });

  }
};
