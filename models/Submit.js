'use strict';
const {Field, Table, Migrate} = require('xiaolan-db');

module.exports = new Table('submit', {
  id:Field.name('id').bigint(true).primary().AI().comment('id'),
  eventID: Field.name('event_id').bigint(true).index().comment('活动ID'),
  userID: Field.name('user_id').bigint(true).index().comment('用户ID'),
  status: Field.name('status').tinyint(true).default(0).index().comment('0初始化 1签到后'),
  createTime: Field.name('create_time').bigint(true).index(),
  updateTime: Field.name('update_time').bigint(true).index()
});
