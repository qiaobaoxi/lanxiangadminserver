'use strict';
const Service = require('egg').Service;

class VideoService extends Service {
  async addVideo(link, grades) {
    const result = await this.app.mysql.insert('video', { link, grades });
    return result;
  }
  async list() {
    const result = await this.app.mysql.select('video');
    return result;
  }
}
module.exports = VideoService;
