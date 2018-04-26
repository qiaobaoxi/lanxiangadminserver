'use strict';

module.exports = appInfo => {
  const config = exports = {
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
      appid: 'wx2ebb67beeaa3f579',
      secret: 'd5b07e786c37cb574f7e5a227ca681ce',
    },
    mysql: {
      // 单数据库信息配置
      client: {
        // host
        host: 'localhost',
        // 端口号
        port: '3306',
        // 用户名
        user: 'root',
        // 密码
        password: '',
        // 数据库名
        database: 'lanxiang',
      },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    },
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1524538446165_1242';

  // add your config here
  config.middleware = [];

  return config;
};
