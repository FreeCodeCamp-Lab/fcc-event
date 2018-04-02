"use strict";



class Submit {
  constructor(options={}){
    this.ID = options.ID;
    this.status = options.status;
    this.validate();
  }

  static fromRequest(req){
    let options={};
    if(!this.pick(req, 'params.ID')){
      throw new Error("Requirement : [ID]");
    }
    options.ID = this.pick(req, 'params.ID', 'number', 1);
    if(!this.pick(req, 'body.status')){
      throw new Error("Requirement : [status]");
    }
    options.status = this.pick(req, 'body.status', 'enum', 1);
    return new Submit(options);
  }

  getStatus(){
    return ({"0":"unknown","1":"报名","2":"签到"})[this.status];
  }

  validate(){
    if(!(!Number.isNaN(this.ID) && (this.ID>=0) && (this.ID<=9007199254740991))){
      throw new Error('type validate failed: [ID]: Number must in range 0 to 9007199254740991');
    }

    if(({"0":"unknown","1":"报名","2":"签到"})[this.status] === undefined){
      throw new Error('type validate failed: [status]: status can only choosing from [" 0 -> unknown  , 1 -> 报名  , 2 -> 签到  ,"]');
    }

  }

  static pick(source, path, type=null, defaultValue=null, memberType=null){
    let paths = path.split('.');
    let tmp = source;
    for(let k in paths){
      if(tmp[paths[k]]){
        tmp = tmp[paths[k]];
      }else{
        tmp = tmp[paths[k]];
        break;
      }
    }
    if(tmp===undefined){
      return defaultValue;
    }
    switch (type){
      case 'string':
        if(typeof tmp === 'object'){
          tmp = JSON.stringify(tmp);
        }else{
          tmp = decodeURIComponent(tmp.toString());
        }
        break;
      case 'number':
      case 'enum':
        tmp = 1*tmp;
        break;
      case 'array':
        if(typeof tmp === 'string'){
          tmp = tmp.split(',');
        }
        if (memberType === 'number') {
          let len = tmp.length;
          for (let i = 0; i < len; i++) {
            tmp[i] = 1 * tmp[i];
          }
        }
        break;
    }
    return (defaultValue && (undefined===tmp)) ? defaultValue: tmp;
  }
}

module.exports = Submit;