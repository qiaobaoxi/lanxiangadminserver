'use strict';

const Controller = require('../core/base_controller');

class LoginController extends Controller {
  async addVideo() {
    const { videoLink = '', selectGrades = [] } = this.ctx.request.body;
    if (!videoLink) {
      return this.fail({}, '请输入链接地址');
    }
    if (selectGrades.length === 0) {
      return this.fail({}, '请选择等级');
    }
    const iSelectGrades = selectGrades.join(',');
    const result = await this.ctx.service.video.addVideo(videoLink, iSelectGrades);
    console.log(result);
    if (result.insertId > 0) {
      this.success();
    } else {
      this.fail({}, '后台添加出错');
    }
  }
  async list() {
    if (this.ctx.cookies.get('admin')) {
      return this.ctx.fail('不是合法用户');
    }
    const result = await this.ctx.service.video.list();
    let item = result[0];
    for (item of result) {
      console.log(item.grades);
      const grades = item.grades.split(',');
      let i = 0;
      const grades1 = [];
      for (i = 0; i < grades.length; i++) {
        const grade = await this.ctx.service.jurisdiction.getById(grades[i]);
        grades1[i] = grade.grade;
      }
      item.grades = grades1.join(',');
    }
    this.success(result);
  }
  async userWatchVideos() {
    const { openId = '' } = this.ctx.request.query;
    if (!openId) {
      return this.fail({}, '不是合法用户');
    }
    const user = await this.ctx.service.user.getUserInfoByOpenId(openId);
    if (!user) {
      return this.fail({}, '用户不存在');
    }
    const jurisdiction = await this.ctx.service.jurisdiction.getById(user.jurisdictionId);
    const videos = await this.ctx.service.video.list();
    const videos1 = videos.filter(item => {
      const grades = item.grades.split(',');
      const isWatch = grades.indexOf(jurisdiction);
      return isWatch > -1;
    });
    this.success(videos1);
  }
}

module.exports = LoginController;
