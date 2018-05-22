'use strict';
const moment = require('moment');
const crypto = require('crypto');
module.exports = app => {
  app.beforeStart(async () => {
    app.moment = moment;
    app.crypto =(value)=>{
      const hash = crypto.createHmac('sha256', value)
          .update('lanxiang123456.')
          .digest('hex');
          return hash;
    }
    app.userOvertime =async (This,value='')=>{
      let cookie=This.ctx.cookies.get(value,{
        signed: false,
        encrypt: true
      })
      let result=0
      if(cookie){
        let jsonCookie=JSON.parse(cookie);
        let time = await This.app.redis.get(jsonCookie.name);
        if(jsonCookie.time!=time){
          result=2000
        }else{
          result=1
        } 
      }else{
        result=0;
      }
      return result
    }
  });
};
