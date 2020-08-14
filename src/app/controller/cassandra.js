'use strict';

// app/controller/user.js
const Controller = require('egg').Controller;
class cassandraController extends Controller {
  async adds() {
    const { ctx } = this;
    let Info;
    const params = ctx.request.body;
    if (!params.table) {
      Info = { code: 1004, content: '', message: '表名不能为空' };
    } else {
      ctx.body = params.data.name;
      if (!params.data) {
        Info = { code: 1004, content: '', message: '参数错误' };
      } else {
        const result = await ctx.service.cassandra.insert(params.table, params.data);
        Info = { code: 0, content: result, message: 'success' };
      }
    }
    ctx.body = Info;
  }

  async show() {
    const { ctx } = this;
    let Info;
    const params = ctx.request.body;
    if (!params.table) {
      Info = { code: 1004, content: '', message: '表名不能为空' };
    } else {
      let filed,
        where,
        orWhere,
        wherein,
        whereNotIn,
        like;
      if (params.filed) {
        filed = params.filed;
      }
      if (!params.where) {
        where = params.where;
        Info = { code: 1004, content: '', message: '查询条件不能为空' };
        ctx.body = Info;
        return;
      }
      if (params.where) {
        where = params.where;
      }
      if (params.orWhere) {
        orWhere = params.orWhere;
      }
      if (params.wherein) {
        wherein = params.wherein;
      }
      if (params.whereNotIn) {
        whereNotIn = params.whereNotIn;
      }
      if (params.like) {
        like = params.like;
      }
      const result = await ctx.service.cassandra.show(params.table, filed, where, orWhere, wherein, whereNotIn, like);
      Info = { code: 0, content: result, message: 'success' };
    }
    ctx.body = Info;
  }

  async lists() {
    const { ctx } = this;
    let Info;
    const params = ctx.request.body;
    if (!params.table) {
      Info = { code: 1004, content: '', message: '表名不能为空' };
    } else {
      let filed,
        where,
        orWhere,
        wherein,
        whereNotIn,
        like,
        orders,
        page,
        pagesize;
      if (params.filed) {
        filed = params.filed;
      }
      if (params.where) {
        where = params.where;
      }
      if (params.orWhere) {
        orWhere = params.orWhere;
      }
      if (params.wherein) {
        wherein = params.wherein;
      }
      if (params.whereNotIn) {
        whereNotIn = params.whereNotIn;
      }
      if (params.like) {
        like = params.like;
      }
      if (params.orders) {
        orders = params.orders;
      }
      if (params.page) {
        page = params.page;
      } else {
        page = 1;
      }
      if (params.pagesize) {
        pagesize = params.pagesize;
      } else {
        pagesize = 20;
      }
      const result = await ctx.service.cassandra.list(params.table, filed, where, orWhere, wherein, whereNotIn, like, orders, page, pagesize);
      Info = { code: 0, content: result, message: 'success' };
    }
    ctx.body = Info;
  }

  async updates() {
    const { ctx } = this;
    let Info;
    const params = ctx.request.body;
    if (!params.table) {
      Info = { code: 1004, content: '', message: '表名不能为空' };
    } else {
      let param,
        where;
      if (!params.where) {
        where = params.where;
        Info = { code: 1004, content: '', message: '查询条件不能为空' };
        ctx.body = Info;
        return;
      }
      if (params.where) {
        where = params.where;
      }
      if (!params.param) {
        where = params.where;
        Info = { code: 1004, content: '', message: '更新内容不能为空' };
        ctx.body = Info;
        return;
      }

      if (params.param) {
        param = params.param;
      }
      const result = await ctx.service.cassandra.update(params.table, where, param);
      Info = { code: 0, content: result, message: 'success' };
    }
    ctx.body = Info;
  }

  async del() {
    const { ctx } = this;
    let Info;
    const params = ctx.request.body;
    if (!params.table) {
      Info = { code: 1004, content: '', message: '表名不能为空' };
    } else {
      let where;
      if (params.where) {
        where = params.where;
      }
      const result = await ctx.service.cassandra.del(params.table, where);
      Info = { code: 0, content: result, message: 'success' };
    }
    ctx.body = Info;
  }
}
module.exports = cassandraController;
