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
  const { path, list, base } = request.body;

  setSelectedBranchList(path, list);

  try {
    const { conflictBranch, conflictFiles } = await runLightmerge(path, list, base);

    if (type.isUndefined(conflictFiles)) {
      response.body = {
        code: 200,
        message: 'success',
      };
    } else {
      response.body = {
        code: 200,
        message: 'failed',
        error: `You have conflicts on file "${conflictFiles}" when merging branch "${conflictBranch}"`,
      };
    }
  } catch (e) {
    response.body = {
      code: 200,
      message: 'failed',
      error: e.message,
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

  const result = await depoly(path);

  if (result.error) {
    response.body = {
      code: 200,
      message: 'failed',
    };
  } else {
    response.body = {
      code: 200,
      message: 'success',
      ...result,
    };
  }
};

module.exports = {
  'GET /repo/list': handleGetRecentRepos,
  'POST /repo/pull': handlePullLatestCode,
  'GET /branch/list': handleGetBranchList,
  'GET /branch/selected': handleGetBranchSelected,
  'POST /branch/lightmerge': handlePostBranchLightmerge,
  'POST /deploy': handleDeploy,
};
