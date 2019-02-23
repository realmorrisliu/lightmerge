const log4js = require('log4js');

log4js.configure({
  appenders: {
    lightmerge: { type: 'console' },
  },
  categories: {
    default: {
      appenders: ['lightmerge'],
      level: 'debug',
    },
  },
});

const Log = log4js.getLogger('lightmerge');
Log.level = 'debug';

module.exports = Log;
