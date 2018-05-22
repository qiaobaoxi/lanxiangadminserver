'use strict';

// const { app } = require('egg-mock/bootstrap');

// describe('test/app/controller/equipment.test.js', () => {
// it('equipment matching  equipmentName=, equipmentPassword=0,userId=0', () => {
//   app.mockCsrf();
//   return app.httpRequest()
//     .post('/equipment/matching')
//     .send({
//       equipmentName: '',
//       equipmentPassword: '',
//       userId: 1,
//     })
//     .expect(200)
//     .expect({
//       code: 0,
//       result: {},
//       msg: '设备码不能为空',
//     });
// });
// it('equipment matching  equipmentName=001, equipmentPassword=,userId=1', () => {
//   app.mockCsrf();
//   return app.httpRequest()
//     .post('/equipment/matching')
//     .send({
//       equipmentName: '001',
//       equipmentPassword: '',
//       userId: 1,
//     })
//     .expect(200)
//     .expect({
//       code: 0,
//       result: {},
//       msg: '设备密码不能为空',
//     });
// });
// it('equipment matching  equipmentName=001, equipmentPassword=123456,userId=0', () => {
//   app.mockCsrf();
//   return app.httpRequest()
//     .post('/equipment/matching')
//     .send({
//       equipmentName: '001',
//       equipmentPassword: '123456',
//       userId: 0,
//     })
//     .expect(200)
//     .expect({
//       code: 0,
//       result: {},
//       msg: '用户不能为空',
//     });
// });
// it('equipment matching  equipmentName=001, equipmentPassword=123456,userId=1', () => {
//   app.mockCsrf();
//   return app.httpRequest()
//     .post('/equipment/matching')
//     .send({
//       equipmentName: '001',
//       equipmentPassword: '123456',
//       userId: 1,
//     })
//     .expect(200)
//     .expect({
//       code: 1,
//       result: {},
//       msg: '添加成功',
//     });
// });
// it('equipment matching  equipmentName=001, equipmentPassword=123456,userId=1', () => {
//   app.mockCsrf();
//   return app.httpRequest()
//     .post('/equipment/matching')
//     .send({
//       equipmentName: '001',
//       equipmentPassword: '123456',
//       userId: 1,
//     })
//     .expect(200)
//     .expect({
//       code: 0,
//       result: {},
//       msg: '设备已存在',
//     });
// });
// it('equipment matching  equipmentName=0010, equipmentPassword=123456,userId=1', () => {
//   app.mockCsrf();
//   return app.httpRequest()
//     .post('/equipment/matching')
//     .send({
//       equipmentName: '0010',
//       equipmentPassword: '123456',
//       userId: 1,
//     })
//     .expect(200)
//     .expect({
//       code: 0,
//       result: {},
//       msg: '添加失败，设备未找到',
//     });
// });
// });

