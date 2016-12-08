/**
 * User.js
 *
 * @description :: user data model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'myMongodbServer',
  migrate: 'safe',
  tableName: 'user',
  globalId: 'UserModel',
  attributes: {
    username: {
      type: 'string'
    },
    nickName: {
      type: 'string'
    },
    password: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    avatar: {
      type: 'string'
    },
    company: {
      type: 'string'
    },
    blog: {
      type: 'string'
    },
    email: {
      type: 'string'
    },
    // biography 简介
    bio: {
      type: 'string'
    },
    gender: {
      type: 'string'
    },
    githubAccount: {
      type: 'string'
    },
    //响应数据时，删除密码字段
    toJSON: function(){
      var obj = this.toObject();
      delete obj.password;
      return obj;
    }
  }
};

