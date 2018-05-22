'use strict';
const Service = require('egg').Service;

class equipmentArametersHistoryService extends Service {
  async getByEquipmentId(equipmentId) {
    const result = await this.app.mysql.select('equipment_arameters_history', { where: { equipmentId } });
    return result;
  }
}
module.exports = equipmentArametersHistoryService;
