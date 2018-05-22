'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  it('user name===""', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/user/addUserOrUpdate')
      .send({
        name: '',
      })
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '姓名不能为空',
      });
  });
  it('user password===""', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/user/addUserOrUpdate')
      .send({
        name: 'admin',
        password: '',
      })
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '密码不能为空',
      });
  });
  it('user grade===""', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/user/addUserOrUpdate')
      .send({
        name: 'admin',
        password: '123456',
        grade: '',
      })
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '请选择等级',
      });
  });
  it('user address===""', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/user/addUserOrUpdate')
      .send({
        name: 'admin',
        password: '123456',
        grade: 2,
        address: '',
      })
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '地址不能为空',
      });
  });
  it('user address===""', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/user/addUserOrUpdate')
      .send({
        name: 'admin',
        password: '123456',
        grade: 2,
        address: '扬州',
      })
      .expect(200)
      .expect({
        code: 1,
        result: {},
        msg: '',
      });
  });
  // it('user userInfo: {nickName: dsf,gender: dsf,avatarUrl: dsf,openid: ,}', () => {
  //   app.mockCsrf();
  //   return app.httpRequest()
  //     .post('/user/addUserOrUpdate')
  //     .send({
  //       userInfo: {
  //         nickName: 'dsf',
  //         gender: 'dsf',
  //         avatarUrl: 'dsf',
  //         openid: '',
  //       },
  //     })
  //     .expect(200)
  //     .expect({
  //       code: 0,
  //       result: {},
  //       msg: '用户信息传送不全',
  //     });
  // });
  // it('user userId,jurisdictionId', () => {
  //   app.mockCsrf();
  //   return app.httpRequest()
  //     .post('/user/setUserJsc')
  //     .send({
  //       userId: 0,
  //     })
  //     .expect(200)
  //     .expect({
  //       code: 0,
  //       result: {},
  //       msg: '不是合法用户',
  //     });
  // });
  // it('user userId,jurisdictionId', () => {
  //   app.mockCsrf();
  //   return app.httpRequest()
  //     .post('/user/setUserJsc')
  //     .send({
  //       userId: 1,
  //       jurisdictionId: 0,
  //     })
  //     .expect(200)
  //     .expect({
  //       code: 0,
  //       result: {},
  //       msg: '请选择等级',
  //     });
  // });
  // it('user userId,jurisdictionId', () => {
  //   app.mockCsrf();
  //   return app.httpRequest()
  //     .post('/user/setUserJsc')
  //     .send({
  //       userId: 1,
  //       jurisdictionId: 1,
  //     })
  //     .expect(200)
  //     .expect({
  //       code: 0,
  //       result: {},
  //       msg: '用户不存在',
  //     });
  // });
  // it('user userId,jurisdictionId', () => {
  //   app.mockCsrf();
  //   return app.httpRequest()
  //     .post('/user/setUserJsc')
  //     .send({
  //       userId: 2,
  //       jurisdictionId: 1,
  //     })
  //     .expect(200)
  //     .expect({
  //       code: 1,
  //       result: {},
  //       msg: '',
  //     });
  // });
  // it('user userId=0', () => {
  //   return app.httpRequest()
  //     .get('/user/getUserById')
  //     .send({
  //       userId: 0,
  //     })
  //     .expect(200)
  //     .expect({
  //       code: 0,
  //       result: {},
  //       msg: '不是合法用户',
  //     });
  // });
  // it('user userId=1', () => {
  //   return app.httpRequest()
  //     .get('/user/getUserById?userId=1')
  //     .expect(200)
  //     .expect({
  //       code: 0,
  //       result: {},
  //       msg: '用户不存在',
  //     });
  // });
  // it('user userId=2', () => {
  //   return app.httpRequest()
  //     .get('/user/getUserById?userId=2')
  //     .expect(200)
  //     .expect({
  //       code: 1,
  //       result: {},
  //       msg: '',
  //     });
  // });
});

