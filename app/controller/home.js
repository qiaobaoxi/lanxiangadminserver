'use strict';
const Controller = require('../core/base_controller');
class HomeController extends Controller {
  async index() {
    this.success({ a: 0 });
  }
}

module.exports = HomeController;
