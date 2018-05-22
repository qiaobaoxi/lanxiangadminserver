'use strict';
const Controller = require('../core/base_controller');
class EquipmentController extends Controller {
  async matching() {
    const { equipmentName = '', equipmentPassword = 0, userId = 0 } = this.ctx.request.body;
    if (!equipmentName) {
      return this.fail({}, '设备码不能为空');
    }
    if (!equipmentPassword) {
      return this.fail({}, '设备密码不能为空');
    }
    if (!userId) {
      return this.fail({}, '用户不能为空');
    }
    let code =await this.app.userOvertime(this,'login');
    if(code===2000){
      this.ctx.body={
        code
      }   
    }else if(code===0){
      this.fail();
    }else{
      const equipments = [
        {
          name: '设备一',
          equipmentName: '001',
          equipmentPassword: '123456',
        },
        {
          name: '设备二',
          equipmentName: '002',
          equipmentPassword: '123456',
        },
        {
          name: '设备三',
          equipmentName: '003',
          equipmentPassword: '123456',
        },
        {
          name: '设备四',
          equipmentName: '004',
          equipmentPassword: '123456',
        },
      ];
      const matchingSuccess = equipments.filter(item => {
        return item.equipmentName === equipmentName && item.equipmentPassword === equipmentPassword;
      });
      if (matchingSuccess.length > 0) {
        for (const item of matchingSuccess) {
          const equipment = await this.ctx.service.equipment.getEquipment(item.name, item.equipmentName, equipmentPassword);
          if (!equipment) {
            const result = await this.ctx.service.equipment.addEquipment(item.name, item.equipmentName, equipmentPassword);
            await this.ctx.service.userequipment.addUserEquipment(result.insertId, userId);
            this.success({equipmentId:result.insertId}, '添加成功');
          } else {
            const result = await this.ctx.service.userequipment.getUserEquipment(equipment.id, userId);
            if (!result) {
              await this.ctx.service.userequipment.addUserEquipment(equipment.id, userId);
              this.success({equipmentId:equipment.id}, '添加成功');
            } else {
              this.fail({}, '设备已存在');
            }
          }
        }
      } else {
        this.fail({}, '添加失败，设备未找到');
      }
    }
  }
  async list() {
    const { userId = 0 } = this.ctx.request.query;
    if (!userId) {
      return this.fail({}, '用户不能为空');
    }
    const list = await this.ctx.service.userequipment.getListByUserId(userId);
    const result = [];
    for (const item of list) {
      const equipment = await this.ctx.service.equipment.getEquipmentById(item.equipmentId);
      equipment.userEquipment = item.id;
      result.push(equipment);
    }
    this.success(result);
  }
  async delete() {
    const { userEquipmentId = 0 } = this.ctx.request.body;
    if (!userEquipmentId) {
      return this.fail({}, '不能删除设备');
    }
    const result = await this.ctx.service.userequipment.delete(userEquipmentId);
    this.success({},'删除成功');
  }
}

module.exports = EquipmentController;
