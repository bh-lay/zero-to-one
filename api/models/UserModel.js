/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
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
    password: {
      type: 'string'
    },
    role: {
      type: 'string'
    },
    gender: {
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

