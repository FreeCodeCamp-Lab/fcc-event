'use strict';
const {Field, Table, Migrate,Presets} = require('xiaolan-db');

module.exports = new Table('attachment', {
  ...Presets.AI,
  eventID: Field.name('event_id').bigint(true).index().comment('活动ID'),
  path: Field.name('path').varchar(1024).comment('地址'),
  ...Presets.opTime,
});
