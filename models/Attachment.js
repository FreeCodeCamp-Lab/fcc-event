'use strict';
const {Field, Table, Migrate} = require('xiaolan-db');

module.exports = new Table('attachment', {
  id:Field.name('id').bigint(true).primary().AI().comment('id'),
  eventID: Field.name('event_id').bigint(true).index().comment('活动ID'),
  path: Field.name('path').varchar(1024).comment('地址'),
  createTime: Field.name('create_time').bigint(true).index(),
  updateTime: Field.name('update_time').bigint(true).index()
});
