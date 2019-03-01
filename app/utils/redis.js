const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();

const asyncRedisFunction = [
  'select',
  'sadd',
  'srem',
  'smembers',
  'rpush',
  'lrange',
  'llen',
  'ltrim',
]
  .map(item => ({ [item]: promisify(client[item]).bind(client) }))
  .reduce((current, target) => Object.assign(target, current));

module.exports = asyncRedisFunction;
