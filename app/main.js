const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const controller = require('./controller');
const Log = require('./utils/logger');

const app = new Koa();
app.use(logger());

const buildPath = path.join(path.resolve(__dirname, '..'), '/build');
const resources = serve(buildPath);
app.use(resources);

app.use(bodyParser());

// log request URL:
app.use(async (ctx, next) => {
  await next();
});
app.use(controller());

const port = 8080;
app.listen(port);
Log.debug(`Listening on port ${port}`);
