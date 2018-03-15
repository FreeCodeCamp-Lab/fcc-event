"use strict";



class Auth {
  constructor(options={}){
    this.token = options.token;
    this.validate();
  }

  static fromRequest(req){
    let options={};
    if(!this.pick(req, 'headers.token')){
      throw new Error("Requirement : [token]");
    }
    options.token = this.pick(req, 'headers.token', 'string', 'token');
    return new Auth(options);
  }

  validate(){
    if(!((typeof this.token === 'string') && (this.token.length>=1) && (this.token.length<=32))){
      throw new Error('type validate failed: [token]: String length must between 1 to 32');
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

module.exports = Auth;