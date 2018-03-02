"use strict";



class Event {
  constructor(options={}){
    this.ID = options.ID || 1;
    this.validate();
  }

  static fromRequest(req){
    let options={};
    options.ID = this.pick(req, 'params.ID', 'number', 1);
    return new Event(options);
  }

  validate(){
    if(!(!Number.isNaN(this.ID) && (this.ID>=0) && (this.ID<=9007199254740991))){
      throw new Error('type validate failed: [ID]: Number must in range 0 to 9007199254740991');
    }

  }

  static pick(source, path, type=null, defaultValue=null){
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
          tmp = tmp.toString();
        }
        break;
      case 'number':
      case 'enum':
        tmp = 1*tmp;
        break;
    }
    return (defaultValue && (undefined===tmp)) ? defaultValue: tmp;
  }
}

module.exports = Event;