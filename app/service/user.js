'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async saveUserInfo(name, password, grade, createTime, address) {
    const user = await this.app.mysql.insert('user', { name, password, grade, createTime, address });
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
  async login(name,password) {
    const user = await this.app.mysql.get('user', { name, password});
    return user;
  }
  async updateUserInfo(id, wxName, wxHead, openId, sex) {
    const user = await this.app.mysql.update('user', { id, wxName, wxHead, openId, sex });
    return user;
  }
  async list() {
    const list = await this.app.mysql.select('user', { columns: [ 'id', 'name', 'grade', 'address', 'createTime' ] });
    return list;
  }
  async update(data) {
    const user = await this.app.mysql.update('user', data);
    return user;
  }
}
module.exports = UserService;
