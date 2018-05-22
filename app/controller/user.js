'use strict';

const Controller = require('../core/base_controller');
const crypto = require('crypto');
class UserController extends Controller {
  async addUserOrUpdate() {
    const { name = '', password = '', grade = 0, address = '',id=0 } = this.ctx.request.body;
    const check = user(name, password, grade, address);
    let  list = await this.ctx.service.user.list();
    const isReapet = repeatName(list,name,id);
    if(isReapet){
      this.fail({}, isReapet);
    }else if (!check) {
      if(id>0){
        //修改用户
        let user = await this.ctx.service.user.getUserInfoById(id);
        let passwordNum = isSamePassword(this.app,user,password);
        if(passwordNum){
          user.name=name;
          user.grade=grade;
          user.address=address;
          this.ctx.service.user.update(user);
          this.success();
        }else{
          this.fail({},'密码不对');
        }
      }else{
        //添加用户
        const secret = password;
        let hash = this.app.crypto(secret);
        await this.ctx.service.user.saveUserInfo(name, hash, grade, new Date(), address);
        this.success();  
      }
    } else{
      this.fail({}, check);
    }
  }
  async login() {
    let {name='',password=''} = this.ctx.request.body;
    if(!name){
      return this.fail({},'账号不能为空'); 
    }
    if(!password){
      return this.fail({},'密码不能为空'); 
    }
    let hash = this.app.crypto(password);
    let user = await this.ctx.service.user.login(name,hash);
    if(user){
      let time=new Date().getTime();
      let cookie={
        name,
        time
      }
      await this.app.redis.set(name, time);
      this.ctx.cookies.set('login',JSON.stringify(cookie), {
        maxAge: 30 * 60 * 1000,
        httpOnly: false, // 默认就是 true
        encrypt: true, // 加密传输
      });
      this.success({userId:user.id});
    }else{
      this.fail({},'密码或者账号出错');
    } 
  }
  async modifyPassword(){
    let {name,oldPassword,newPassword1,newPassword2} = this.ctx.request.body;
    if(!name){
      return this.fail({},'账号不能为空'); 
    }
    if(!oldPassword){
      return this.fail({},'原始密码不能为空'); 
    }
    if(!newPassword1){
      return this.fail({},'新密码不能为空'); 
    }
    if(!newPassword2){
      return this.fail({},'再次输入密码不能为空'); 
    }
    if(newPassword1!==newPassword2){
      return this.fail({},'两次输入的密码不一致'); 
    }
    let hash=this.app.crypto(oldPassword);
      let user = await this.ctx.service.user.login(name,hash);
      if(user){
        let hash=this.app.crypto(newPassword1);
        user.password=hash;
        await this.ctx.service.user.update(user);
        this.success();
      }else{
        this.fail({},'密码或者账号出错');
      }
  }
  async list() {
    const list = await this.ctx.service.user.list();
    for (const item of list) {
      item.createTime = this.app.moment(item.createTime).format('YYYY-MM-DD HH:mm');
    }
    this.success(list);
  }
  async setUserJsc() {
    const { userId = 0, jurisdictionId = 0 } = this.ctx.request.body;
    if (!userId) {
      return this.fail({}, '不是合法用户');
    }
    if (!jurisdictionId) {
      return this.fail({}, '请选择等级');
    }
    const user = await this.ctx.service.user.getUserInfoById(userId);
    if (!user) {
      return this.fail({}, '用户不存在');
    }
    user.jurisdictionId = jurisdictionId;
    const result = await this.ctx.service.user.update(user);
    console.log(result);
    this.success();
  }
  async getUserById() {
    const { userId = 0 } = this.ctx.request.query;
    if (!userId) {
      return this.fail({}, '不是合法用户');
    }
    const user = await this.ctx.service.user.getUserInfoById(userId);
    if (!user) {
      return this.fail({}, '用户不存在');
    }
    user.password='';
    this.success(user);
  }
}

function repeatName(arr,name,id){
  let isRepeat=arr.some((item)=>{
    return  item.name===name&&item.id!==id;
  })
  let info=''
  if(isRepeat){
    info='账号已重复'
  }
  return info
}
function user(name = '', password = '', grade = 0, address = '') {
  let info = '';
  if (!name) {
    info = '姓名不能为空';
  } else if (!password) {
    info = '密码不能为空';
  } else if (!grade) {
    info = '请选择等级';
  } else if (!address) {
    info = '地址不能为空';
  }
  return info;
}
function isSamePassword(app,user,password){
  let hash = app.crypto(password);
  let result=0;
  if(hash===user.password){
    result=1;
  }
  return  result;
}
module.exports = UserController;
