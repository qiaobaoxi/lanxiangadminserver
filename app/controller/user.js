'use strict';

const Controller = require('../core/base_controller');

class UserController extends Controller {
  async wxLoginByCode() {
    const { code = '' } = this.ctx.request.body;
    if (!code) {
      return this.fail({}, '请传入code');
    }
    const result = await this.ctx.curl('https://api.weixin.qq.com/sns/jscode2session?appid=' + this.config.wxApp.appid + '&secret=' + this.config.wxApp.secret + '&js_code=' + code + '&grant_type=authorization_code', {
      dataType: 'json',
    });
    this.success(result);
  }
  async addUserOrUpdate() {
    const { userInfo = '' } = this.ctx.request.body;
    const createTime = this.ctx.app.moment().format('YYYY-MM-DD HH:mm:ss');
    if (!userInfo) {
      return this.fail({}, '没有传送用户信息');
    }
    const { nickName = '', gender = '', avatarUrl = '', openid = '' } = userInfo;
    if (!nickName || gender === '' || !avatarUrl || !openid) {
      return this.fail({}, '用户信息传送不全');
    }
    const user = await this.ctx.service.user.getUserInfoByOpenId(openid);
    if (!user) {
      const saveResult = await this.ctx.service.user.saveUserInfo(nickName, avatarUrl, openid, gender, createTime);
      return this.success(saveResult);
    }
    const updateResult = await this.ctx.service.user.updateUserInfo(nickName, avatarUrl, openid, gender, user.id);
    return this.success(updateResult);
  }
  async list() {
    const list = await this.ctx.service.user.list();
    let item = '';
    for (item of list) {
      item.createTime = this.ctx.app.moment(item.createTime).format('YYYY-MM-DD HH:mm');
      const jurisdiction = await this.ctx.service.jurisdiction.getById(item.jurisdictionId);
      if (jurisdiction && typeof jurisdiction === 'object') {
        item.grade = jurisdiction.grade;
      }
      if (Number(item.sex) === 0) {
        item.sex = '男';
      } else {
        item.sex = '女';
      }
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
    if (Number(user.sex) === 0) {
      user.sex = '男';
    } else {
      user.sex = '女';
    }
    this.success(user);
  }
}

module.exports = UserController;
