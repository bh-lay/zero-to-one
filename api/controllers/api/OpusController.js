/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
var path = require('path');
var gm = require('gm');
var imageMagick = gm.subClass({ imageMagick: true });

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
      // 上限5M
      maxBytes: 5 * 1000 * 1000,
    },function (err, uploadedFiles) {
      if (err) {
        if (err.code == 'E_EXCEEDS_UPLOAD_LIMIT') {
          return res.negotiate({
            code: 201,
            msg: '图片上限5M'
          });
        } else {
          return res.negotiate({
            code: 202
          });
        }

      }

      if (uploadedFiles.length === 0){
        return res.badRequest({
          code: 203,
          msg: '没有上传文件'
        });
      }
      var file = uploadedFiles[0];
      var extensionMatch = file.filename.match(/(?:\.)[^\.]+$/);
      // 上传文件没有后缀名
      if(!extensionMatch){
        return res.badRequest({
          code: 204,
          msg: '上传文件没有有效的后缀名'
        });
      }

      var randomID = (new Date().getTime()*100000 + Math.ceil( Math.random() * 100000 )).toString(36);
      // 动态生成新文件
      var newFilename = randomID + extensionMatch[0].toLocaleLowerCase();
      // 文件相对根目录的路径
      var fileRelativePath = path.join(sails.config.upload.opusPath, newFilename);
      // 文件存储目录
      var newFilePath = path.join(sails.config.upload.root, fileRelativePath);

      // 剪裁图片
      imageMagick(file.fd)
        .autoOrient()
        .noProfile()
        .size(function(err, size) {
          if (err) {
            return res.ok({
              code: 205,
              msg: '处理文件失败'
            });
          }
          var saveWidth = 500;
          var newWidth = saveWidth;
          var newHeight = saveWidth;
          var xoffset = 0;
          var yoffset = 0;

          if (size.width < size.height) {
            newHeight = saveWidth * size.height / size.width;
          } else {
            newWidth  = saveWidth * size.width / size.height;
          }

          if (saveWidth < newWidth) {
            xoffset = (newWidth - saveWidth)/2;
          }
          if (saveWidth < newHeight) {
            yoffset = (newHeight - saveWidth)/2;
          }
          this
              .quality(80)
              .resize(newWidth, newHeight, "!")
              .crop(saveWidth, saveWidth, xoffset, yoffset)
              .write(newFilePath, function(err){
                if (err) {
                  return res.ok({
                    code: 205,
                    msg: '处理文件失败'
                  });
                }
                return res.ok({
                  code: 0,
                  url: sails.config.upload.domain + fileRelativePath
                });
              });
          });
    });

  }
};