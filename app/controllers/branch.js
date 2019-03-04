const {
  getBranchList,
  getBranchSelected,
  setSelectedBranchList,
  setRecentRepos,
  getRecentRepos,
  runLightmerge,
  pullLatestCode,
} = require('../models/branch');
const type = require('../utils/type');

const handleGetBranchList = async ({ query, response }) => {
  const { path: pathToRepo } = query;

  const fullList = await getBranchList(pathToRepo);
  const list = fullList.filter(branch => !branch.includes('origin')).sort().reverse();
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

  response.body = {
    code: 200,
    message: 'success',
    data: list,
  };
};
const handlePostBranchLightmerge = async ({ request, response }) => {
  const { path, list } = request.body;

  setSelectedBranchList(path, list);
  const { conflictBranch, conflictFiles } = await runLightmerge(path, list);

  if (type.isUndefined(conflictFiles)) {
    response.body = {
      code: 200,
      message: 'success',
    };
  } else {
    response.body = {
      code: 200,
      message: 'success',
      data: {
        branch: conflictBranch,
        files: conflictFiles,
      },
    };
  }
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

  const error = await pullLatestCode(path, username, password);

  if (error) {
    response.body = {
      code: 200,
      message: error,
    };
  }

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
};
