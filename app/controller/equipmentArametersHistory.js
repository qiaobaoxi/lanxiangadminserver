'use strict';
const Controller = require('../core/base_controller');
class EquipmentArametersHistoryController extends Controller {
  async getByEquipmentId() {
    const { equipmentId = 0, openId = '' } = this.ctx.request.query;
    if (typeof Number(equipmentId) === 'number' && !Number(equipmentId)) {
      return this.fail({}, '请传入设备Id');
    }
    if (typeof openId === 'string' && !openId) {
      return this.fail({}, '非法用户');
    }
    const equipment = await this.ctx.service.equipment.getEquipmentById(equipmentId);
    if (!equipment) {
      return this.fail({}, '设备不存在');
    }
    const user = await this.ctx.service.user.getUserInfoByOpenId(openId);
    if (!user) {
      return this.fail({}, '用户不存在');
    }
    const equipmentArameters = await this.ctx.service.equipmentArametersHistory.getByEquipmentId(equipmentId);
    if (!equipmentArameters) {
      return this.fail({}, '未查询到该设备内容');
    }
    this.success(equipmentArameters);
  }
}

module.exports = EquipmentArametersHistoryController;
