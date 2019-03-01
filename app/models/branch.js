const {
  Repository,
  Reference,
  Branch,
  Signature,
  Merge,
  Index,
  Cred,
} = require('nodegit');

const {
  smembers,
  sadd,
  rpush,
  lrange,
  llen,
  ltrim,
} = require('../utils/redis');

const Log = require('../utils/logger');

const getBranchList = async (pathToRepo) => {
  const repo = await Repository.open(pathToRepo);
  const refs = await repo.getReferences(Reference.TYPE.LISTALL);
  const list = await Promise.all(refs.reduce((total, ref) => total.concat(Branch.name(ref)), []));

  return list.sort().reverse();
};

const getBranchSelected = async (path) => {
  const list = await lrange(path, 0, -1);
  return list || [];
};

const setSelectedBranchList = async (path, list) => {
  const listLength = await llen(path);
  await ltrim(path, listLength, 0);
  await rpush(path, list);
};

const setRecentRepos = async (path) => {
  await sadd('recentRepos', path);
};

const getRecentRepos = async () => {
  const list = await smembers('recentRepos');
  return list || [];
};

const runLightmerge = async (path, list) => {
  const repo = await Repository.open(path);
  const masterCommit = await repo.getMasterCommit();

  Log.debug('Pulling the latest code...');
  repo.fetchAll({
    credentials: () => Cred.userpassPlaintextNew(username, password),
  }).then(() => {
    repo.mergeBranches('master', 'origin/master');
  });

  Log.debug('Overwrite lightmerge with master');
  await Branch.create(repo, 'lightmerge', masterCommit, 1);

  const signature = Signature.default(repo);
  let conflictFiles;
  let conflictBranch;

  /* eslint-disable no-restricted-syntax */
  for (const branch of list) {
    try {
      /* eslint-disable no-await-in-loop */
      await repo.mergeBranches(
        'lightmerge',
        branch,
        signature,
        Merge.PREFERENCE.NO_FASTFORWARD,
        null,
      );
    } catch (index) {
      conflictBranch = branch;

      conflictFiles = [
        ...new Set(
          index
            .entries()
            .filter(entry => Index.entryIsConflict(entry))
            .map(entry => entry.path),
        ),
      ];
    }
  }

  return { conflictBranch, conflictFiles };
};

module.exports = {
  getBranchList,
  getBranchSelected,
  setSelectedBranchList,
  setRecentRepos,
  getRecentRepos,
  runLightmerge,
};