/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_123456';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  const urlConfig = {
    etingapi: 'http://xing.aparcar.cn:7191/test',
    kafka: 'http://xing.aparcar.cn:7191/test',
  };

  exports.security = {
    csrf: false,
  };
  return {
    ...config,
    ...userConfig,
    ...urlConfig,
  };
};
