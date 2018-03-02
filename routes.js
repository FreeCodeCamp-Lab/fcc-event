'use strict';

const Router = require('xiaolan-router');

let router = new Router();

//router.use('gate').get('', 'index');
router.group('event').use('gate').post('', 'create_event');
router.group('event').use('gate').put('/{ID}', 'update_event');
router.group('event').use('gate').get('/{ID}', 'event_profile');

router.group('event').use('gate').post('/submit', 'create_submit');
router.group('event').use('gate').put('/submit/{ID}', 'update_submit');
module.exports = router;
