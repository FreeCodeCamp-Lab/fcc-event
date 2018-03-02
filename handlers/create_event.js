'use strict';
const EventModel = require('../definitions/models/Event.gen');

const Event = {
  //名字 string:1,64 in:body require
  name: 'unamed',
  //日期 string:10,10 in:body require
  date: '2018-01-01',
  //类型 enum:小活动,专场活动,大型活动 in:body
  type: 1,
  //描述 string:0,255 in:body
  desc: '',
  //地点  number:0,255 in:body
  place: 0
};

module.exports = async (Event) => {
  let model = EventModel.create(Event);
  let date = new Date();
  model.updateTime = model.createTime = Number.parseInt(date.getTime() / 1000);

  let saved = await model.save(true);
  if (saved === true) {
    return model;
  } 
  return error.INTERNAL_ERROR.withMessage('写入数据错误');
};