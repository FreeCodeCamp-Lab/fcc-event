//获取活动每日报名统计
'use strict';
const SubmitModel = require('../definitions/models/Submit.gen');
const EventModel = require('../definitions/models/Event.gen');

const Query = {
  //活动ID number:1,9999 in:params
  eventID: 1
};

module.exports = async (Query) => {
  let event = await EventModel.fetchById(Query.eventID);
  let sql = 'select FROM_UNIXTIME(submit_time, "%Y-%m-%d") `date`,count(*) `count` from `submit` where event_id=:eventID group by `date` order by `date` asc limit 100';
  let list = await SubmitModel.raw(sql, Query, false);
  return {
    event: event,
    stat: list,
  };
};