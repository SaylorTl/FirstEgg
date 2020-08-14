'use strict';
module.exports = {
  dieJson($error_code, $err_msg) {
    const { ctx } = this;
    ctx.body = { code: $error_code, message: $err_msg };
  },
  successJson($err_msg, $content = null) {
    const { ctx } = this;
    ctx.body = { code: 0, message: 'success', content: $content };
  },
  async  sendtokafka(data) {
    // const header = [ 'Content-Type: application/vnd.kafka.json.v2+json', 'Accept: application/vnd.kafka.v2+json' ];
    const body = JSON.stringify({ records: [{ value: data }] });
    // const options = { headers: header, method: 'POST', contentType: 'json', data: body };
    const options = { method: 'POST', contentType: 'json', data: body, dataType: 'json' };
    const kafka_url = this.config.kafka;
    if (!kafka_url) {
      return 'kafka地址未配置';
    }
    const result = await this.ctx.curl(kafka_url, options);
    return result.data;
  },
};
