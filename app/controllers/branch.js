const {
  getBranchList,
  getBranchSelected,
  setSelectedBranchList,
  setRecentRepos,
  getRecentRepos,
  runLightmerge,
  pullLatestCode,
  depoly,
} = require('../models/branch');
const type = require('../utils/type');

const handleGetBranchList = async ({ query, response }) => {
  const { path: pathToRepo } = query;

  const fullList = await getBranchList(pathToRepo);
  const list = fullList.filter(branch => !branch.includes('origin')).sort().reverse();

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

  response.body = {
    code: 200,
    message: 'success',
    data: list,
  };
};
const handlePostBranchLightmerge = async ({ request, response }) => {
  const { path, list, base } = request.body;

  setSelectedBranchList(path, list);

  await runLightmerge(path, list, base);

  response.body = {
    code: 200,
    message: 'success',
  };
};

const handleGetRecentRepos = async ({ response }) => {
  const list = await getRecentRepos();

  response.body = {
    code: 200,
    message: 'success',
    data: list,
  };
};

const handlePullLatestCode = async ({ request, response }) => {
  const { path, username, password } = request.body;

  setRecentRepos(path);

  const error = await pullLatestCode(path, username, password);

  if (error) {
    response.body = {
      code: 200,
      message: 'failed',
      error,
    };
  }

  response.body = {
    code: 200,
    message: 'success',
  };
};

const handleDeploy = async ({ request, response }) => {
  const { path } = request.body;

  depoly(path);

  response.body = {
    code: 200,
    message: 'success',
  };
};

module.exports = {
  'GET /repo/list': handleGetRecentRepos,
  'POST /repo/pull': handlePullLatestCode,
  'GET /branch/list': handleGetBranchList,
  'GET /branch/selected': handleGetBranchSelected,
  'POST /branch/lightmerge': handlePostBranchLightmerge,
  'POST /deploy': handleDeploy,
};
