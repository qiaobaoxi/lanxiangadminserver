'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // login
  const user = app.role.can('user');
  const isAdmin = app.role.can('isAdmin');
  router.post('/login', controller.login.index);

  // user
  router.post('/user/addUserOrUpdate', controller.user.addUserOrUpdate);
  router.post('/user/login',controller.user.login);
  router.post('/user/modifyPassword', controller.user.modifyPassword);
  router.get('/user/list', isAdmin ,controller.user.list);
  router.get('/user/getUserById', controller.user.getUserById);
  router.post('/user/setUserJsc', controller.user.setUserJsc);
  // jurisdiction 权限
  router.post('/jurisdiction/addJsc', controller.jurisdiction.addJsc);
  router.get('/jurisdiction/list', controller.jurisdiction.list);
  // video
  router.post('/video/addVideo', controller.video.addVideo);
  router.get('/video/list', controller.video.list);
  router.get('/video/userWatchVideos', controller.video.userWatchVideos);
  // equipment
  router.post('/equipment/matching', controller.equipment.matching);
  router.get('/equipment/list', user, controller.equipment.list);
  router.post('/equipment/delete',user, controller.equipment.delete);
  // equipmentArameters
  router.get('/equipmentArameters/getByEquipmentId', controller.equipmentArameters.getByEquipmentId);
  router.post('/equipmentArameters/setEquipment', controller.equipmentArameters.setEquipment);
  // equipmentArametersHistory
  router.get('/equipmentArametersHistory/getByEquipmentId', controller.equipmentArametersHistory.getByEquipmentId);
  router.post('/equipmentPort/addEquipmentPort', user , controller.equipmentPort.addEquipmentPort);
  router.post('/equipmentPort/addEquipmentPort', user , controller.equipmentPort.addEquipmentPort);
  router.get('/equipmentPort/getEquipmentPort', user , controller.equipmentPort.getEquipmentPort);
  app.io.route('index', app.io.controller.index.index);
};
