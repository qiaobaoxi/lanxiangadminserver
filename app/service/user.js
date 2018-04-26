'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async saveUserInfo(wxName, wxHead, openId, sex, createTime) {
    const user = await this.app.mysql.insert('user', { wxName, wxHead, openId, sex, createTime });
    return user;
  }
  async getUserInfoByOpenId(openId) {
    const user = await this.app.mysql.get('user', { openId });
    return user;
  }
  async getUserInfoById(id) {
    const user = await this.app.mysql.get('user', { id });
    return user;
  }
  async updateUserInfo(wxName, wxHead, openId, sex, id) {
    const user = await this.app.mysql.update('user', { id, wxName, wxHead, openId, sex });
    return user;
  }
  async list() {
    const list = await this.app.mysql.select('user');
    return list;
  }
  async update(data) {
    const user = await this.app.mysql.update('user', data);
    return user;
  }
}
module.exports = UserService;
