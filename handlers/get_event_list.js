'use strict';

const EventModel = require('../definitions/models/Event.gen');

const Query = {
  //名字包含 string:0,10 in:query
  name: '',
  //类型 enum:小活动,专场活动,大型活动 in:query
  type: '',
  //页码 number:1,999 in:query
  page: 1
};



module.exports = async (Query) => {
  const PAGE_SIZE = 10;

  let sql = 'select * from `event` where 1 ';

  if (!!Query.type) {
    sql += 'and type=:type ';
  }
  if (!!Query.name) {
    sql += 'and name like "%' + Query.name + '%"';
  }
  sql += 'order by `date` desc limit ' + (Query.page - 1) * PAGE_SIZE + ',' + PAGE_SIZE;
  let count = await EventModel.raw(sql.replace('*', 'count(*) c'), Query, false);
  if (count.length) {
    count = count[0].c;
  } else {
    count = 0;
  }

  let list = await EventModel.raw(sql, Query);

  return {
    data: list,
    total: count,
  };
};