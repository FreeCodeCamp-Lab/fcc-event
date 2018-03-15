"use strict";
const Connection = require('xiaolan-db').Connection('default').conn;
const TableName = "event";

class Event {

  constructor(data={}){
    this.id = (data.id||data.id)||0;
    this.name = (data.name||data.name)||'uname';
    this.date = (data.date||data.date)||'';
    this.type = (data.type||data.type)||1;
    this.desc = (data.desc||data.desc)||'--';
    this.place = (data.place||data.place)||1;
    this.createTime = (data.createTime||data.create_time)||0;
    this.updateTime = (data.updateTime||data.update_time)||0;
  }

  static fetchById(v){
    let sql = 'select * from `event` where `id`=:v limit 1';
    //@row
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{v:v}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          if(r[0]){
            resolved(new Event(r[0]));
          }else{
            resolved(null);
          }
        }
      });
    });
  }

  static fetchByDate(date, page=1, pageSize=10){
    let sql = 'select * from `event` where `date`=:date order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{date: date}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new Event(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByPlace(place, page=1, pageSize=10){
    let sql = 'select * from `event` where `place`=:place order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{place: place}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new Event(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByCreateTime(createTime, page=1, pageSize=10){
    let sql = 'select * from `event` where `create_time`=:createTime order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{createTime: createTime}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new Event(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByUpdateTime(updateTime, page=1, pageSize=10){
    let sql = 'select * from `event` where `update_time`=:updateTime order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@list
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{updateTime: updateTime}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new Event(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static fetchByName(name, page=1, pageSize=10){
    let sql = 'select * from `event` where `name`=:name order by `id` desc limit '+((page-1)*pageSize)+','+pageSize+'';
    //@row
    return new Promise((resolved, rejected) => {
      Connection.query({sql:sql, params:{name: name}}, (e ,r)=>{
        if(e){
          rejected(e);
        }else{
          if(r[0]){
            resolved(new Event(r[0]));
          }else{
            resolved(null);
          }
        }
      });
    });
  }

  static fetchByAttr(data={}, page=1, pageSize=10){
    let allowKey = ['id','date','place','create_time','update_time','name'];
    let sql = 'select * from `event` where 1 ';
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
            result.push(new Event(r[k]));
          }
          resolved(result);
        }
      });
    });
  }

  static raw(sql='',params={}){
    if(!sql.includes('limit')){
      throw new Error('raw sql must with paging');
    }
    //@list
    return new Promise((resolved, rejected)=>{
      Connection.query({sql:sql,params:params}, (e, r)=>{
        if(e){
          rejected(e);
        }else{
          let result = [];
          for(let k in r) {
            result.push(new Event(r[k]));
          }
          resolved(result);
        }
      });
    });
  }
    
  static table(){
    return TableName;
  }
  
  static count(expression,where){
    let sql = 'select count('+expression+') from `event` ';
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
    if(this.name !== null && !(typeof this.name==='string' && this.name.length>=0 && this.name.length<=64)){
      throw new Error('attribute name(name) must be a string length in [0,64]');
    }
    if(this.date !== null && !(typeof this.date==='string' && this.date.length>=0 && this.date.length<=16)){
      throw new Error('attribute date(date) must be a string length in [0,16]');
    }
    if(this.type !== null && !(typeof this.type==='number' && this.type>=0 && this.type<=255)){
      throw new Error('attribute type(type) must be a number in [0,255]');
    }
    if(this.desc !== null && !(typeof this.desc==='string' && this.desc.length>=0 && this.desc.length<=2014)){
      throw new Error('attribute desc(desc) must be a string length in [0,2014]');
    }
    if(this.place !== null && !(typeof this.place==='number' && this.place>=0 && this.place<=65535)){
      throw new Error('attribute place(place) must be a number in [0,65535]');
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
    return new Event(data);
  }

}

const FieldMap = {
  id: 'id',
  name: 'name',
  date: 'date',
  type: 'type',
  desc: 'desc',
  place: 'place',
  create_time: 'createTime',
  update_time: 'updateTime',
};

const KeyMap = {
  id: 'id',
  name: 'name',
  date: 'date',
  type: 'type',
  desc: 'desc',
  place: 'place',
  createTime: 'create_time',
  updateTime: 'update_time',
};


module.exports = Event;
