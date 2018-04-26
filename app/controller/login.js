'use strict';

const Controller = require('../core/base_controller');

class LoginController extends Controller {
  async index() {
    const { userName = '', password = '' } = this.ctx.request.body;
    const { userName1 = '', password1 = '' } = this.config.user;
    if (!userName || !password) {
      return this.fail({}, '账号或密码不能为空');
    }
    if (userName !== userName1 || password !== password1) {
      return this.fail({}, '账号或密码输入有误');
    }
    this.ctx.cookies.set('admin', '123456', {
      maxAge: 30 * 60 * 1000,
      httpOnly: false, // 默认就是 true
      encrypt: true, // 加密传输
    });
    this.success({
      id: 1,
      username: 'admin',
      password: '123456',
      avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
      name: '张某某',
    });
  }
}

module.exports = LoginController;
