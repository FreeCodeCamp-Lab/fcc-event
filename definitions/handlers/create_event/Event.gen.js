"use strict";



class Event {
  constructor(options={}){
    this.name = options.name;
    this.date = options.date;
    this.type = options.type || 1;
    this.desc = options.desc || '';
    this.place = options.place || 0;
    this.validate();
  }

  static fromRequest(req){
    let options={};
    if(!this.pick(req, 'body.name')){
      throw new Error("Requirement : [name]");
    }
    options.name = this.pick(req, 'body.name', 'string', 'unamed');
    if(!this.pick(req, 'body.date')){
      throw new Error("Requirement : [date]");
    }
    options.date = this.pick(req, 'body.date', 'string', '2018-01-01');
    options.type = this.pick(req, 'body.type', 'enum', 1);
    options.desc = this.pick(req, 'body.desc', 'string', '');
    options.place = this.pick(req, 'body.place', 'number', 0);
    return new Event(options);
  }

  getType(){
    return ({"0":"unknown","1":"小活动","2":"专场活动","3":"大型活动"})[this.type];
  }

  validate(){
    if(!((typeof this.name === 'string') && (this.name.length>=1) && (this.name.length<=64))){
      throw new Error('type validate failed: [name]: String length must between 1 to 64');
    }

    if(!((typeof this.date === 'string') && (this.date.length>=10) && (this.date.length<=10))){
      throw new Error('type validate failed: [date]: String length must between 10 to 10');
    }

    if(({"0":"unknown","1":"小活动","2":"专场活动","3":"大型活动"})[this.type] === undefined){
      throw new Error('type validate failed: [type]: type can only choosing from [" 0 -> unknown  , 1 -> 小活动  , 2 -> 专场活动  , 3 -> 大型活动  ,"]');
    }

    if(!((typeof this.desc === 'string') && (this.desc.length>=0) && (this.desc.length<=255))){
      throw new Error('type validate failed: [desc]: String length must between 0 to 255');
    }

    if(!(!Number.isNaN(this.place) && (this.place>=0) && (this.place<=255))){
      throw new Error('type validate failed: [place]: Number must in range 0 to 255');
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
          tmp = tmp.toString();
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

module.exports = Event;