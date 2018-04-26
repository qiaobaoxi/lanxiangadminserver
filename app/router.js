'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  // login
  router.post('/login', controller.login.index);

  // user
  router.post('/user/wxLoginByCode', controller.user.wxLoginByCode);
  router.post('/user/addUserOrUpdate', controller.user.addUserOrUpdate);
  router.get('/user/list', controller.user.list);
  router.get('/user/getUserById', controller.user.getUserById);
  router.post('/user/setUserJsc', controller.user.setUserJsc);
  // jurisdiction 权限
  router.post('/jurisdiction/addJsc', controller.jurisdiction.addJsc);
  router.get('/jurisdiction/list', controller.jurisdiction.list);
  // video
  router.post('/video/addVideo', controller.video.addVideo);
  router.get('/video/list', controller.video.list);
  router.get('/video/userWatchVideos', controller.video.userWatchVideos);
};
