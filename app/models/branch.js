const Branch = require('nodegit');

const { Repository, Reference } = Branch;
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

module.exports = {
  getBranchList,
};
