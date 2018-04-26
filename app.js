'use strict';
const moment = require('moment');
module.exports = app => {
  app.beforeStart(async () => {
    app.moment = moment;
  });
};
