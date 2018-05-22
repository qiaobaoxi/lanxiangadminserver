'use strict';

module.exports = appInfo => {
  const config = exports = {
    redis : {
      client: {
        port: 6379,          // Redis port
        host: '127.0.0.1',   // Redis host
        password: 'auth',
        db: 0,
      },
    },
    user: {
      userName1: 'admin',
      password1: '123456',
    },
    security: {
      csrf: {
        enable: false, // 默认为 false，当设置为 true 时，将会放过所有 content-type 为 `application/json` 的请求
      },
      xframe: {
        enable: false,
      },
    },
    wxApp: {
      appid: 'wx1a41365dfd8db183',
      secret: '735495c8678fc2a2473406ea36cb2784',
    },
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: '47.98.162.168',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '123456',
        // 数据库名
        database: 'lanxiang',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
    io: {
      init: { }, // passed to engine.io
      namespace: {
        '/index': {
          connectionMiddleware: [ ],
          packetMiddleware: [ ],
        },
      },
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1524538446165_1242';

  // add your config here
  config.middleware = [];

  return config;
};
