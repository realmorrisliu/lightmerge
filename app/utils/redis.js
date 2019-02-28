const redis = require('redis');
const { promisify } = require('util');

const client = redis.createClient();
const select = promisify(client.select).bind(client);
const sadd = promisify(client.sadd).bind(client);
const srem = promisify(client.srem).bind(client);
const smembers = promisify(client.smembers).bind(client);

module.exports = {
  select,
  sadd,
  srem,
  smembers,
};
