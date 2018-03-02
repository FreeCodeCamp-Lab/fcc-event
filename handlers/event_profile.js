'use strict';
const EventModel = require('../definitions/models/Event.gen');
const Event = {
  //ID number in:params
  ID: 1
};

module.exports = async (Event) => {
  let model = await EventModel.fetchById(Event.ID);
  
  if(model === null ){
    return error.EVENT_NOT_FOUND.withMessage('ID不对?');
  }
  return model;
};