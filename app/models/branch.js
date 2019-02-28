const Git = require('nodegit');
const { smembers, srem, sadd } = require('../utils/redis');

const { Repository, Reference } = Git;
const openRepo = path => Repository.open(path);

const getBranchList = pathToRepo => new Promise((resolve) => {
  openRepo(pathToRepo)
    .then(repository => repository.getReferenceNames(Reference.TYPE.LISTALL))
    .then(referenceList => resolve(
      referenceList
        .filter(name => !name.includes('remotes'))
        .map(name => name.replace('refs/heads/', ''))
        .sort()
        .reverse(),
    ))
    .catch((e) => {
      resolve(e);
    })
    .done();
});

const getBranchSelected = async (path) => {
  const list = await smembers(path);
  return list || [];
};

const setSelectedBranchList = async (path, list) => {
  const oldList = await smembers(path);
  if (oldList.length !== 0) {
    await srem(path, oldList);
  }
  await sadd(path, list);
};

module.exports = {
  getBranchList,
  getBranchSelected,
  setSelectedBranchList,
};
