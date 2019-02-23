const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const serve = require('koa-static');
const controller = require('./controller');

const app = new Koa();

const buildPath = path.join(path.resolve(__dirname, '..'), '/build');
const resources = serve(buildPath);
app.use(resources);

app.use(bodyParser());

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});
app.use(controller());

const port = 8080;
app.listen(8080);
console.log(`Listening on ${port}`);
