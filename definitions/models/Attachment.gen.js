"use strict";
const Connection = require('xiaolan-db').Connection('default').conn;
const TableName = "attachment";

class Attachment {

  constructor(data={}){
    this.id = (data.id||data.id)||0;
    this.eventID = (data.eventID||data.event_id)||0;
    this.path = (data.path||data.path)||'';
    this.createTime = (data.createTime||data.create_time)||0;
    this.updateTime = (data.updateTime||data.update_time)||0;
  }

  static fetchById(v){
    let sql = 'select * from `attachment` where `id`=:v limit 1';
    //@row
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{v:v}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          if(r[0]){
            resolved(new Attachment(r[0]));
          }else{
            resolved(null);
          }
        }
      });
    });
  }

  static fetchByEventID(eventID, page=1, pageSize=10){
    let sql = 'select * from `attachment` where `event_id`=:eventID order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{eventID: eventID}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new Attachment(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByCreateTime(createTime, page=1, pageSize=10){
    let sql = 'select * from `attachment` where `create_time`=:createTime order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{createTime: createTime}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new Attachment(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByUpdateTime(updateTime, page=1, pageSize=10){
    let sql = 'select * from `attachment` where `update_time`=:updateTime order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{updateTime: updateTime}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new Attachment(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByAttr(data={}, page=1, pageSize=10){
    let allowKey = ['id','event_id','create_time','update_time'];
    let sql = 'select * from `attachment` where 1 ';
    if(Object.keys(data).length===0){
      throw new Error('data param required');
    }
    for(let k in data){
      let field = '';
      if(allowKey.includes(k)){
        field = k;
      }else if(allowKey.includes(KeyMap[k])){
        field = KeyMap[k];
      }else{
        throw new Error('Not Allow Fetching By [ "'+k+'" ]');
      }
      if (Array.isArray(data[k]) && data[k].length) {
        sql += ' and `'+field+'` in ("'+data[k].join('","')+'")';
      } else {
        sql += ' and `'+field+'`=:'+k+'';
      }
      
    }
    sql += ' order by `id` desc limit '+((page-1)*pageSize)+','+pageSize;
    //@list
    return new Promise((resolved, rejected)=>{
      Connection.query({sql:sql,params:data}, (e, r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new Attachment(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static raw(sql='',params={}, obj=true){
    if(!sql.includes('limit')){
      throw new Error('raw sql must with paging');
    }
    //@list
    return new Promise((resolved, rejected)=>{
      Connection.query({sql:sql,params:params}, (e, r)=>{
        if(e){
          rejected(e);
        }else{
          if (obj) {
            let result = [];
            for(let k in r) {
              result.push(new Attachment(r[k]));
            }
            resolved(result);
          }else{
            resolved(r);
          }
        }
      });
    });
  }
    
  static table(){
    return TableName;
  }
  
  static count(expression,where){
    let sql = 'select count('+expression+') from `attachment` ';
    let conditions = [];
    let params = {};
    for(let k in where){
      conditions.push(' `'+k+'`=:'+k);
      params[k] = where[k];
    }
    if(conditions.length){
      sql += 'where '+conditions.join(' and ');
    }
    //@number
    return new Promise((resolved,rejected)=>{
      Connection.query({sql:sql,params:params}, (e,r)=>{
        if(e){
          rejected(e);
        }else{
          if(r[0]){
            resolved(r[0]['count('+expression+')']);
          }else{
            resolved(null);
          }
        }
      });
    });
  }
  
  data(){
    let obj = {};
    for(let k in FieldMap){
      obj[FieldMap[k]] = this[FieldMap[k]];
    }
    return obj;
  }

  row(){
    let row = {};
    for(let k in FieldMap){
      row[k] = this[FieldMap[k]];
    }
    return row;
  }

  validate(){
    if(this.eventID !== null && !(typeof this.eventID==='number' && this.eventID>=0 && this.eventID<=18014398509481982)){
      throw new Error('attribute eventID(event_id) must be a number in [0,18014398509481982]');
    }
    if(this.path !== null && !(typeof this.path==='string' && this.path.length>=0 && this.path.length<=1024)){
      throw new Error('attribute path(path) must be a string length in [0,1024]');
    }
    if(this.createTime !== null && !(typeof this.createTime==='number' && this.createTime>=0 && this.createTime<=18014398509481982)){
      throw new Error('attribute createTime(create_time) must be a number in [0,18014398509481982]');
    }
    if(this.updateTime !== null && !(typeof this.updateTime==='number' && this.updateTime>=0 && this.updateTime<=18014398509481982)){
      throw new Error('attribute updateTime(update_time) must be a number in [0,18014398509481982]');
    }
  }

  save(force=false){
    if(force){
      try{
        this.validate();
      }catch(e){
        return Promise.resolve(Object.assign(error.BAD_REQUEST, {message: error.BAD_REQUEST.message+':'+e.message}));
      }
    }
    //@true
    return new Promise((resolved, rejected) => {
      let data = this.data();
      data.createTime = data.createTime||Number.parseInt(Date.now()/1000);
      data.updateTime = data.updateTime||Number.parseInt(Date.now()/1000);
      let sql = `insert into \`${TableName}\` set `;
      let fields = [];
      for(let k in data){
        if(k==='id' || data[k]===null){
          continue;
        }
        fields.push(`\`${KeyMap[k]}\`=:${k}`);
      }
      sql += fields.join(',');
      Connection.query({sql: sql,params:data},(e, r) => {
        if(e) {
          rejected(e);
        }else{
          this.id = r.insertId;
          this.createTime = data.createTime;
          this.updateTime = data.updateTime;
          resolved(true);
        }
      });
    });
  }

  update(force=false){
    if(force){
      this.validate();
    }
    //@true
    return new Promise((resolved, rejected) => {
      let sql = `update \`${TableName}\` set `;
      let data = this.data();
      data.updateTime = data.updateTime||Number.parseInt(Date.now()/1000);
      let fields = [];
      for(let k in data){
        if(k==='id' || data[k]===null){
          continue;
        }
        fields.push(`\`${KeyMap[k]}\`=:${k}`);
      }
      sql += fields.join(',');
      sql += ` where \`id\`=:id`;
      Connection.query({sql: sql,params:data},(e, r) => {
        if(e) {
          rejected(e);
        }else{
          resolved(true);
        }
      });
    });
  }

  static create(data){
    //@this
    return new Attachment(data);
  }

}

const FieldMap = {
  id: 'id',
  event_id: 'eventID',
  path: 'path',
  create_time: 'createTime',
  update_time: 'updateTime',
};

const KeyMap = {
  id: 'id',
  eventID: 'event_id',
  path: 'path',
  createTime: 'create_time',
  updateTime: 'update_time',
};


module.exports = Attachment;
