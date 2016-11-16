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
    firstName: {
      type: 'string'
    },
    lastName: {
      type: 'string'
    },
    gender: {
      type: 'number'
    }
  }
};

