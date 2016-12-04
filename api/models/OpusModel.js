/**
 * User.js
 *
 * @description :: opus data model
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  connection: 'myMongodbServer',
  migrate: 'safe',
  tableName: 'opus',
  globalId: 'OpusModel',
  attributes: {
    // 标题
    title: {
      type: 'string'
    },
    // 创建者 _id
    createBy: {
      type: 'string'
    },
    // 简介
    intro: {
      type: 'string'
    },
    // 缩略图
    cover: {
      type: 'string'
    },
    // 地址
    url: {
      type: 'string'
    },
    // github地址 如 bh-lay/blog
    githubFullName: {
      type: 'string'
    },
    // 爬虫获取github相关数据
    github: {
      type: 'object'
    }
  }
};

