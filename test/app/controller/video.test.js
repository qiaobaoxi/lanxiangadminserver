'use strict';

const { app } = require('egg-mock/bootstrap');

describe('test/app/controller/login.test.js', () => {
  it('addVideo videoLink:, selectGrades:[]', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/video/addVideo')
      .send({
        videoLink: '',
        selectGrades: [],
      })
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '请输入链接地址',
      });
  });
  it('addVideo videoLink:admin, selectGrades:[]', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/video/addVideo')
      .send({
        videoLink: 'admin',
        selectGrades: [],
      })
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '请选择等级',
      });
  });
  it('addVideo videoLink: admin selectGrades: 123456', () => {
    app.mockCsrf();
    return app.httpRequest()
      .post('/video/addVideo')
      .send({
        videoLink: 'admin',
        selectGrades: [ '123456' ],
      })
      .expect(200)
      .expect({
        code: 1,
        result: {
        },
        msg: '',
      });
  });
  it('userWatchVideos openId=0', () => {
    return app.httpRequest()
      .get('/video/userWatchVideos?openId=')
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '不是合法用户',
      });
  });
  it('userWatchVideos openId=dsafdsafdsf', () => {
    return app.httpRequest()
      .get('/video/userWatchVideos?openId=dsafdsafdsf')
      .expect(200)
      .expect({
        code: 0,
        result: {},
        msg: '用户不存在',
      });
  });
  it('userWatchVideos openId=ok94Z0SMaDMmyQYWws1CYOTGPDQE', () => {
    return app.httpRequest()
      .get('/video/userWatchVideos?openId=ok94Z0SMaDMmyQYWws1CYOTGPDQE')
      .expect(200)
      .expect({
        code: 1,
        result: [],
        msg: '',
      });
  });
});

