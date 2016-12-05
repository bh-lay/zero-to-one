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
      type: 'string',
      required: true
    },
    // 创建者 _id
    createBy: {
      type: 'string',
      required: true
    },
    // 简介
    intro: {
      type: 'string',
      required: true
    },
    // 缩略图
    cover: {
      type: 'string',
      required: true
    },
    // 地址
    url: {
      type: 'string',
      required: true
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

