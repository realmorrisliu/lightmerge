const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const logger = require('koa-logger');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

const httpServer = require('http').Server(app.callback());

const controller = require('./controller');
const Log = require('./utils/logger');
const { select } = require('./utils/redis');
const socket = require('./utils/ws')(httpServer);

socket.on('connection', () => {
  Log.debug('connected');
});

const REDIS_DB = 1;

app.use(logger());

const buildPath = path.join(path.resolve(__dirname, '..'), '/build');
const resources = serve(buildPath);
app.use(resources);

app.use(bodyParser());

// log request URL:
app.use(async (ctx, next) => {
  await select(REDIS_DB);
  await next();
});
app.use(controller());

const port = 9002;
app.listen(port);
Log.debug(`Listening on port ${port}`);
