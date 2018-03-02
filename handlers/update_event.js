'use strict';
const EventModel = require('../definitions/models/Event.gen');
const Event = {
  //ID number in:params require
  ID: 1,
  //名字 string:0,64 in:body
  name: '',
  //日期 string:0,10 in:body
  date: '',
  //类型 enum:小活动,专场活动,大型活动 in:body
  type: 0,
  //描述 string:0,255 in:body
  desc: '',
  //地点  number:0,255 in:body
  place: 0
};

module.exports = async (Event) => {
  let model = await EventModel.fetchById(Event.ID);
  
  if(model === null ){
    return error.EVENT_NOT_FOUND.withMessage('ID不对?');
  }
  delete Event.ID;
  for(let key in Event){
    if(Event[key]){
      model[key] = Event[key];
    }
  }
  let saved = await model.update(true);
  if (saved === true) {
    return model;
  } 
  return error.INTERNAL_ERROR.withMessage('写入数据错误');
}