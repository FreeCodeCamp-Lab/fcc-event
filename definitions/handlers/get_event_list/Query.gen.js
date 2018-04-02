"use strict";



class Query {
  constructor(options={}){
    this.name = options.name || '';
    this.type = options.type || 0;
    this.page = options.page || 1;
    this.validate();
  }

  static fromRequest(req){
    let options={};
    options.name = this.pick(req, 'query.name', 'string', '');
    options.type = this.pick(req, 'query.type', 'enum', 0);
    options.page = this.pick(req, 'query.page', 'number', 1);
    return new Query(options);
  }

  getType(){
    return ({"0":"unknown","1":"小活动","2":"专场活动","3":"大型活动"})[this.type];
  }

  validate(){
    if(!((typeof this.name === 'string') && (this.name.length>=0) && (this.name.length<=10))){
      throw new Error('type validate failed: [name]: String length must between 0 to 10');
    }

    if(({"0":"unknown","1":"小活动","2":"专场活动","3":"大型活动"})[this.type] === undefined){
      throw new Error('type validate failed: [type]: type can only choosing from [" 0 -> unknown  , 1 -> 小活动  , 2 -> 专场活动  , 3 -> 大型活动  ,"]');
    }

    if(!(!Number.isNaN(this.page) && (this.page>=1) && (this.page<=999))){
      throw new Error('type validate failed: [page]: Number must in range 1 to 999');
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