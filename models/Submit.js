'use strict';
const { Field, Table, Migrate, Presets } = require('xiaolan-db');

module.exports = new Table('submit', {
  ...Presets.AI,
  eventID: Field.name('event_id').bigint(true).index().uniq('event_user').comment('活动ID'),
  userID: Field.name('user_id').bigint(true).index().uniq('event_user').comment('用户ID'),
  status: Field.name('status').tinyint(true).default(0).index().comment('0初始化 1签到后'),
  submitTime: Field.name('submit_time').bigint(true).comment('报名时间'),
  ...Presets.opTime,
});
