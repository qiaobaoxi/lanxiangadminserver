'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/jurisdiction.test.js', () => {
  it('addJsc grade=0', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/jurisdiction/addJsc')
      .send({
        grade: 0,
        describe: '',
      })
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '请输入等级',
      });
  });
  it('addJsc grade=1 describe=', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/jurisdiction/addJsc')
      .send({
        grade: 1,
        describe: '',
      })
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '请输入描述信息',
      });
  });
  // it('addJsc grade=1 describe=权限', () => {
  //   app.mockCsrf();
  //   return app.httpRequest()
  //     .post('/jurisdiction/addJsc')
  //     .send({
  //       grade: 1,
  //       describe: '权限',
  //     })
  //     .expect(200)
  //     .expect({
  //       code: 1,
  //       result: {},
  //       msg: '',
  //     });
  // });
  // it('addJsc grade=1 describe=权限', () => {
  //   app.mockCsrf();
  //   return app.httpRequest()
  //     .post('/jurisdiction/addJsc')
  //     .send({
  //       grade: 1,
  //       describe: '权限',
  //     })
  //     .expect(200)
  //     .expect({
  //       code: 0,
  //       result: {},
  //       msg: '等级不能重复',
  //     });
  // });
});

