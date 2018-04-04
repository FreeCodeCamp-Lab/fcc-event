"use strict";



class Query {
  constructor(options={}){
    this.eventID = options.eventID || 1;
    this.validate();
  }

  static fromRequest(req){
    let options={};
    options.eventID = this.pick(req, 'params.eventID', 'number', 1);
    return new Query(options);
  }

  validate(){
    if(!(!Number.isNaN(this.eventID) && (this.eventID>=1) && (this.eventID<=9999))){
      throw new Error('type validate failed: [eventID]: Number must in range 1 to 9999');
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

module.exports = Query;