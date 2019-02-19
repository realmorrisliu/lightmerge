const path = require('path');
const Koa = require('koa');
const serve = require('koa-static');
const controller = require('./controller');

const app = new Koa();

const buildPath = path.join(path.resolve(__dirname, '..'), '/build');
const resources = serve(buildPath);
app.use(resources);

// log request URL:
app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});
app.use(controller());

app.listen(8080);
