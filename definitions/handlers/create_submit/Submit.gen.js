"use strict";



class Submit {
  constructor(options={}){
    this.eventID = options.eventID;
    this.userID = options.userID;
    this.validate();
  }

  static fromRequest(req){
    let options={};
    if(!this.pick(req, 'body.eventID')){
      throw new Error("Requirement : [eventID]");
    }
    options.eventID = this.pick(req, 'body.eventID', 'number', 1);
    if(!this.pick(req, 'body.userID')){
      throw new Error("Requirement : [userID]");
    }
    options.userID = this.pick(req, 'body.userID', 'number', 1);
    return new Submit(options);
  }

  validate(){
    if(!(!Number.isNaN(this.eventID) && (this.eventID>=0) && (this.eventID<=9007199254740991))){
      throw new Error('type validate failed: [eventID]: Number must in range 0 to 9007199254740991');
    }

    if(!(!Number.isNaN(this.userID) && (this.userID>=0) && (this.userID<=9007199254740991))){
      throw new Error('type validate failed: [userID]: Number must in range 0 to 9007199254740991');
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

module.exports = Submit;