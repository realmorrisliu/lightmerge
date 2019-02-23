const Git = require('nodegit');
const type = require('../utils/type');

const { Repository, Reference } = Git;
const openRepo = path => Repository.open(path);

const getBranchList = pathToRepo => new Promise((resolve) => {
  openRepo(pathToRepo)
    .then(repository => repository.getReferenceNames(Reference.TYPE.LISTALL))
    .then(referenceList => resolve(
      referenceList
        .filter(name => !name.includes('remotes'))
        .map(name => name.replace('refs/heads/', '')),
    ))
    .catch((e) => {
      resolve(e);
    })
    .done();
});

const handleGetBranchList = async ({ request, response }) => {
  const { path: pathToRepo } = request.body;

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

module.exports = {
  'POST /repo/branch/list': handleGetBranchList,
};
