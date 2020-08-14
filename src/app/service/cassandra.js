// app/service/user.js
'use strict';

const Service = require('egg').Service;
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: [ '192.168.1.111' ], localDataCenter: 'datacenter1', keyspace: 'eparking' });
class CassandraService extends Service {

  async insert(table, $params) {
    const keyArr = [];
    const valueArr = [];
    const paramsArr = [];
    let query = 'INSERT INTO ' + table + ' (';
    for (const key in $params) {
      keyArr.push(key);
      paramsArr.push('?');
      valueArr.push($params[key]);
    }
    query += keyArr.join(',');
    query += ') VALUES (';
    query += paramsArr.join(',') + ')';
    client.execute(query, valueArr, { prepare: true })
      .then(result => { return result; });
  }

  async show(table, fileds = [ '*' ], where = [], orWhere = [], wherein = [], whereNotIn = [], like = []) {
    const filed = fileds.join(',');
    let query = 'SELECT ' + filed + ' FROM ' + table + ' where ';
    const valueArr = [];
    const wherekeys = Object.keys(where);
    const length = wherekeys.length;
    for (const $v in where) {
      if ($v === wherekeys[length - 1]) {
        query += $v + '=? ';
      } else {
        query += $v + '=? and ';
      }
      valueArr.push(where[$v]);
    }
    if (wherein !== [] && !wherein) {
      for (const $v in wherein) {
        query += ' and ' + $v + 'in ? ';
        valueArr.push(wherein[$v]);
      }
    }
    if (like !== [] && !like) {
      for (const $v in like) {
        query += ' and ' + $v + 'like ? % ';
        valueArr.push(like[$v]);
      }
    }
    if (orWhere !== [] && !orWhere) {
      for (const $v in orWhere) {
        query += ' or ' + $v + '=? ';
        valueArr.push(orWhere[$v]);
      }
    }
    if (whereNotIn !== [] && !whereNotIn) {
      for (const $v in whereNotIn) {
        query += ' and ' + $v + 'not in ? ';
        valueArr.push(whereNotIn[$v]);
      }
    }
    query += ' limit 1';
    return client.execute(query, valueArr, { prepare: true })
      .then(result => { if (result.rows) { return result.rows[0]; } return false; });
  }

  async list(table, fileds = [ '*' ], where = [], orWhere = [], wherein = [], whereNotIn = [], like = [], order = [], page = 1, pagesize = 20) {
    const filed = fileds.join(',');
    let query = 'SELECT ' + filed + ' FROM ' + table + ' where ';
    const wherekeys = Object.keys(where);
    const length = wherekeys.length;
    const valueArr = [];
    for (const $v in where) {
      if ($v === wherekeys[length - 1]) {
        query += $v + '=? ';
      } else {
        query += $v + '=? and ';
      }
      valueArr.push(where[$v]);
    }
    if (wherein !== [] && !wherein) {
      for (const $v in wherein) {
        query += ' and ' + $v + 'in ? ';
        valueArr.push(wherein[$v]);
      }
    }
    if (like !== [] && !like) {
      for (const $v in like) {
        query += ' and ' + $v + 'like ?% ';
        valueArr.push(like[$v]);
      }
    }
    if (orWhere !== [] && !orWhere) {
      for (const $v in orWhere) {
        query += ' or ' + $v + '=? ';
        valueArr.push(orWhere[$v]);
      }
    }
    if (whereNotIn !== [] && !whereNotIn) {
      for (const $v in whereNotIn) {
        query += ' and ' + $v + 'not in ? ';
        valueArr.push(whereNotIn[$v]);
      }
    }
    if (order !== [] && !order) {
      query += ' order by ' + order;
    }

    if (!page) {
      const $offset = pagesize * (page - 1);
      query += ' limit ' + pagesize + ' offset ' + $offset;
    }

    return client.execute(query, valueArr, { prepare: true })
      .then(result => { if (result.rows) { return result.rows; } return false; });
  }

  async update(table, where = [], params = []) {
    let query = 'update ' + table + ' set ';
    const paramskeys = Object.keys(params);
    const paramslength = paramskeys.length;
    const valueArr = [];
    for (const $v in params) {
      if ($v === paramskeys[paramslength - 1]) {
        query += $v + '=? where ';
      } else {
        query += $v + '=?,';
      }
      valueArr.push(params[$v]);
    }
    const wherekeys = Object.keys(where);
    const length = wherekeys.length;
    for (const $v in where) {
      if ($v === wherekeys[length - 1]) {
        query += $v + '=? ';
      } else {
        query += $v + '=? and ';
      }
      valueArr.push(where[$v]);
    }
    return client.execute(query, valueArr, { prepare: true })
      .then(result => { if (result.info) { return true; } return false; });
  }

  async del(table, where) {
    let query = 'delete  FROM ' + table + ' where ';
    const wherekeys = Object.keys(where);
    const length = wherekeys.length;
    const valueArr = [];
    for (const $v in where) {
      if ($v === wherekeys[length - 1]) {
        query += $v + '=? ';
      } else {
        query += $v + '=? and ';
      }
      valueArr.push(where[$v]);
    }
    return client.execute(query, valueArr, { prepare: true })
      .then(result => { if (result.info) { return true; } return false; });
  }
}
module.exports = CassandraService;
