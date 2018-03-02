'use strict';
const SubmitModel = require('../definitions/models/Submit.gen');

const Submit = {
  //活动ID number in:body require
  eventID: 1,
  //用户ID number in:body require
  userID: 1,
};

module.exports = async (Submit) => {
  let model = SubmitModel.create(Submit);
  model.status = 1;
  let saved = await model.save(true);
  if (saved === true) {
    return model;
  } 
  return error.INTERNAL_ERROR.withMessage('写入数据错误');
};