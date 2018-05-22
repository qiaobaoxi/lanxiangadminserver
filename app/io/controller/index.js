'use strict';

const Controller = require('egg').Controller;

class IndexController extends Controller {
  async index() {
    const { ctx } = this;
    // const message = ctx.args[0];
    let equipmentId=message.equipmentId;
    setInterval(async () => {
      let list = await this.ctx.service.equipmentArameters.listByEquipmentIdAndState();
      await ctx.socket.emit('res', list);
    }, 1000);
  }
}

module.exports = IndexController;
