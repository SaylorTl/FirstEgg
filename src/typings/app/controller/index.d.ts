// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCassandra = require('../../../app/controller/cassandra');
import ExportEtingapi = require('../../../app/controller/etingapi');

declare module 'egg' {
  interface IController {
    cassandra: ExportCassandra;
    etingapi: ExportEtingapi;
  }
}
