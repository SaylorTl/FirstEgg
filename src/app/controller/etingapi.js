'use strict';

const Controller = require('egg').Controller;
class etingapiController extends Controller {
  async syncs() {
    const { ctx } = this;
    const params = ctx.request.body;
    if (params.cmd) {
      const func_name = params.cmd;
      switch (func_name) {
        case 'in':
          await this.in(params);
          break;
        case 'out':
          await this.out(params);
          break;
        default:
          ctx.helper.dieJson('10004', params);
          return;
      }
    }
  }

  async in(params) {
    const { ctx } = this;
    const etingapi_url = this.config.etingapi;
    if (!etingapi_url) {
      ctx.helper.dieJson('10004', 'kafka地址未配置');
      return;
    }
    const options = { method: 'POST', contentType: 'json', data: params, dataType: 'json' };
    const res = ctx.helper.sendtokafka(params);
    if (!res) {
      ctx.helper.dieJson('10004', '请求失败');
      return;
    }
    const result = await ctx.curl(etingapi_url, options);
    if (!result.data) {
      ctx.helper.dieJson('10004', '请求失败');
      return;
    }
    ctx.helper.successJson('success', result.data);
  }

  async out(params) {
    const { ctx } = this;
    const etingapi_url = this.config.etingapi;
    if (!etingapi_url) {
      ctx.helper.dieJson('10004', 'kafka地址未配置');
      return;
    }
    const options = { method: 'POST', contentType: 'json', data: params, dataType: 'json' };
    ctx.helper.sendtokafka(params);
    const result = await this.ctx.curl(etingapi_url, options);
    ctx.helper.successJson('success', result);
  }
}
module.exports = etingapiController;
