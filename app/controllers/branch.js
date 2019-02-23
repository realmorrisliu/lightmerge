const { getBranchList } = require('../models/branch');
const type = require('../utils/type');
const Log = require('../utils/logger');

const handleGetBranchList = async ({ query, response }) => {
  const { path: pathToRepo } = query;

  const list = await getBranchList(pathToRepo);

  if (type.isArray(list)) {
    response.body = {
      code: 200,
      message: 'success',
      data: list || [],
    };
  } else {
    response.body = {
      code: 404,
      message: `Cannot find Repo: ${pathToRepo}`,
    };
  }
};
const handleGetBranchSelected = async ({ response }) => {
  const list = ['feature/task-log'];

  response.body = {
    code: 200,
    message: 'success',
    data: list || [],
  };
};
const handlePostBranchLightmerge = async ({ request, response }) => {
  const { sourceBranches } = request;
  Log.debug(sourceBranches);

  response.body = {
    code: 200,
    message: 'success',
  };
};

module.exports = {
  'GET /branch/list': handleGetBranchList,
  'GET /branch/selected': handleGetBranchSelected,
  'POST /branch/lightmerge': handlePostBranchLightmerge,
};
