const {
  getBranchList,
  getBranchSelected,
  setSelectedBranchList,
  setRecentRepos,
  getRecentRepos,
} = require('../models/branch');
const type = require('../utils/type');
const Log = require('../utils/logger');

const handleGetBranchList = async ({ query, response }) => {
  const { path: pathToRepo } = query;

  const list = await getBranchList(pathToRepo);
  setRecentRepos(pathToRepo);

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
const handleGetBranchSelected = async ({ query, response }) => {
  const { path } = query;

  const list = await getBranchSelected(path);
  Log.debug(list);

  response.body = {
    code: 200,
    message: 'success',
    data: list,
  };
};
const handlePostBranchLightmerge = async ({ request, response }) => {
  const { path, list } = request.body;

  setSelectedBranchList(path, list);

  response.body = {
    code: 200,
    message: 'success',
  };
};

const handleGetRecentRepos = async ({ response }) => {
  const list = await getRecentRepos();
  Log.debug(list);

  response.body = {
    code: 200,
    message: 'success',
    data: list,
  };
};

module.exports = {
  'GET /repo/list': handleGetRecentRepos,
  'GET /branch/list': handleGetBranchList,
  'GET /branch/selected': handleGetBranchSelected,
  'POST /branch/lightmerge': handlePostBranchLightmerge,
};
