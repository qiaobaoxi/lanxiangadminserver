'use strict';
const Service = require('egg').Service;

class EquipmentService extends Service {
  async getEquipment(name, equipmentName, equipmentPassword) {
    const result = await this.app.mysql.get('equipment', { name, equipmentName, equipmentPassword });
    return result;
  }
  async getEquipmentById(id) {
    const result = await this.app.mysql.get('equipment', { id });
    return result;
  }
  async addEquipment(name, equipmentName, equipmentPassword) {
    const result = await this.app.mysql.insert('equipment', { name, equipmentName, equipmentPassword });
    return result;
  }
}
module.exports = EquipmentService;
