const { getBranchList, getBranchSelected, setSelectedBranchList } = require('../models/branch');
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
const handleGetBranchSelected = async ({ query, response }) => {
  const { path } = query;

  const list = await getBranchSelected(path);
  Log.debug(list);

  response.body = {
    code: 200,
    message: 'success',
    data: list || [],
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

module.exports = {
  'GET /branch/list': handleGetBranchList,
  'GET /branch/selected': handleGetBranchSelected,
  'POST /branch/lightmerge': handlePostBranchLightmerge,
};
