'use strict';
const Controller = require('../core/base_controller');
class EquipmentPorttController extends Controller {
  async addEquipmentPort() {
    let {equipmentId=0, drainageOverflowHeight=0, InterceptingLimitflowHeight=0, sunnyToRain=0, vigilance=0, cod=0, ss=0, startWaterLevel1=0, stopWaterLevel1=0, startWaterLevel2=0, stopWaterLevel2=0, startWaterLevel3=0, stopWaterLevel3=0,rainGauge=0,pattern=0,clientState=1,seaLevel=0} = this.ctx.request.body.device;
    let equipmentPort = await this.ctx.service.equipmentPort.getByEquipmentId(equipmentId)
    if(!equipmentPort){
      await this.ctx.service.equipmentPort.addEquipmentPort(equipmentId, drainageOverflowHeight, InterceptingLimitflowHeight, sunnyToRain, vigilance, cod, ss, startWaterLevel1, stopWaterLevel1, startWaterLevel2, stopWaterLevel2, startWaterLevel3, stopWaterLevel3,rainGauge,clientState,seaLevel);
    }else{
      equipmentPort.drainageOverflowHeight=drainageOverflowHeight;
      equipmentPort.InterceptingLimitflowHeight=InterceptingLimitflowHeight;
      equipmentPort.sunnyToRain=sunnyToRain;
      equipmentPort.vigilance=vigilance;
      equipmentPort.cod=cod;
      equipmentPort.ss=ss;
      equipmentPort.startWaterLevel1=startWaterLevel1;
      equipmentPort.stopWaterLevel1=stopWaterLevel1;
      equipmentPort.startWaterLevel2=startWaterLevel2;
      equipmentPort.stopWaterLevel2=stopWaterLevel2;
      equipmentPort.startWaterLevel3=startWaterLevel3;
      equipmentPort.stopWaterLevel3=stopWaterLevel3;
      equipmentPort.rainGauge=rainGauge;
      equipmentPort.pattern=pattern;
      equipmentPort.clientState=clientState;
      equipmentPort.seaLevel=seaLevel;
      await this.ctx.service.equipmentPort.update(equipmentPort);
    }
    this.success();
  }
  async getEquipmentPort() {
    console.log(this.ctx.request.body.device)
    let {equipmentId=0} = this.ctx.request.query;
    if(!equipmentId){
        return this.fail({},'请传入设备id')
    }
    let equipment = await this.ctx.service.equipment.getEquipmentById(equipmentId);
    if(!equipment){
        return this.fail({},'设备不存在')
    }
    let equipmentPort = await this.ctx.service.equipmentPort.getByEquipmentId(equipmentId);
    this.success(equipmentPort);
  }
}

module.exports = EquipmentPorttController;
