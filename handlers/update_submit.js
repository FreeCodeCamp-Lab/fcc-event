'use strict';
const SubmitModel = require('../definitions/models/Submit.gen');
const Submit = {
  //ID number in:params require
  ID: 1,
  //状态 enum:报名,签到 in:body require
  status:1,
};

module.exports = async (Submit) => {
  
  let model = await SubmitModel.fetchById(Submit.ID);
  
  if(model === null ){
    return error.SUBMIT_NOT_FOUND.withMessage('ID不对?');
  }
  delete Submit.ID;
  model.status = Submit.status;
  
  let saved = await model.update(true);
  if (saved === true) {
    return model;
  } 
  return error.INTERNAL_ERROR.withMessage('写入数据错误');
}