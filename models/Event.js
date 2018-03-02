'use strict';
const {Field, Table, Migrate} = require('xiaolan-db');

module.exports = new Table('event', {
  id:Field.name('id').bigint(true).primary().AI().comment('id'),
  name: Field.name('name').varchar(64).default("uname").index().comment("name of event"),
  date: Field.name('date').char(16).index().default('').comment('日期'),
  type: Field.name('type').tinyint(true).default(1).comment('1.小活动 2.专场 3.大型活动'),
  desc: Field.name('desc').varchar(2014).default('--').comment('描述'),
  place: Field.name('place').smallint(true).default(1).index().comment('活动场地ID'),
  createTime: Field.name('create_time').bigint(true).index(),
  updateTime: Field.name('update_time').bigint(true).index()
});
