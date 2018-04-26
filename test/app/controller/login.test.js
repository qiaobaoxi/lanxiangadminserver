'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/login.test.js', () => {
  it('login userName:  password: 123456', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/login')
      .send({
        userName: '',
        password: '123456',
      })
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '账号或密码不能为空',
      });
  });
  it('login userName: admin password: 1234567', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/login')
      .send({
        userName: 'admin',
        password: '1234567',
      })
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '账号或密码输入有误',
      });
  });
  it('login userName: admin password: 123456', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/login')
      .send({
        userName: 'admin',
        password: '123456',
      })
      .expect(200)
      .expect({
        code: 1,
        result: {
          id: 1,
          username: 'admin',
          password: '123456',
          avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
          name: '张某某',
        },
        msg: '',
      });
  });
});

