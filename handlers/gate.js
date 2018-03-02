'use strict';

const Auth = {
  //秘钥 in:headers string:1,32 require
  token:'token'
};

module.exports = async (Auth)=>{
  if(Auth.token === ''){
    return error.UNAUTHORIZED;
  }
  if(Auth.token !== process.env['APP_KEY']){
    return error.AUTHORIZED_INVALID;
  }
  return true;
}