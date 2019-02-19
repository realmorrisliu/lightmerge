// const Git = require('nodegit');

// const openRepo = path => Git.Repository.open(path);

const getGit = async (ctx) => {
  const { name } = ctx.params;
  // openRepo(name);
  ctx.response.body = `<h1>Hello, ${name}!</h1>`;
};

module.exports = {
  'GET /branch/:name': getGit,
};
