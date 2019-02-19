/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const Router = require('koa-router');

const prefix = '/api';
const router = Router({ prefix });

function addMapping(mapping) {
  console.log(mapping);
  Object.keys(mapping).forEach((url) => {
    if (url.startsWith('GET ')) {
      const path = url.substring(4);
      router.get(path, mapping[url]);
      console.log(`register URL mapping: GET ${prefix}${path}`);
    } else if (url.startsWith('POST ')) {
      const path = url.substring(5);
      router.post(path, mapping[url]);
      console.log(`register URL mapping: POST ${prefix}${path}`);
    } else if (url.startsWith('PUT ')) {
      const path = url.substring(4);
      router.put(path, mapping[url]);
      console.log(`register URL mapping: PUT ${prefix}${path}`);
    } else if (url.startsWith('DELETE ')) {
      const path = url.substring(7);
      router.del(path, mapping[url]);
      console.log(`register URL mapping: DELETE ${prefix}${path}`);
    } else {
      console.log(`invalid URL: ${url}`);
    }
  });
}

function addControllers(dir) {
  fs.readdirSync(`${__dirname}/${dir}`).filter(f => f.endsWith('.js')).forEach((f) => {
    console.log(`process controller: ${f}...`);
    // eslint-disable-next-line global-require
    const mapping = require(`${__dirname}/${dir}/${f}`);
    addMapping(mapping);
  });
}

module.exports = (dir) => {
  const controllersDir = dir || 'controllers';
  addControllers(controllersDir);
  return router.routes();
};
