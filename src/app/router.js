'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/add', controller.cassandra.adds);
  router.post('/show', controller.cassandra.show);
  router.post('/lists', controller.cassandra.lists);
  router.post('/update', controller.cassandra.updates);
  router.post('/del', controller.cassandra.del);
  router.get('/travel', controller.etingapi.syncs);
};
