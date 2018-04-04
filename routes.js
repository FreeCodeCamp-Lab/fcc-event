'use strict';

const Router = require('xiaolan-router');

let router = new Router();


router.group('event').use('gate')
  .post('', 'create_event')
  .put('/{ID}', 'update_event')
  .post('/submit', 'create_submit')
  .put('/submit/{ID}', 'update_submit');

router.reset().group('event')
  .get('/{eventID}/submit_stat', 'get_event_submit_daily')
  .get('', 'get_event_list')
  .get('/{ID}', 'event_profile');

module.exports = router;
