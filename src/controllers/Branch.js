import { Get, Post } from '../utils/network';
import Repo from '../utils/repo';
import Auth from '../utils/auth';

const API = {
  getBranchList: '/branch/list',
  getSelectedBranchList: '/branch/selected',
  updateBranchLightmerge: '/branch/lightmerge',
  getRecentRepos: '/repo/list',
};

const getBranchList = async () => new Promise((resolve) => {
  Get(API.getBranchList, {
    path: Repo.getPath(),
  }).then((result) => {
    if (result.code === 200) {
      resolve(result.data);
    }
  });
});

const getSelectedBranchList = async () => new Promise((resolve) => {
  Get(API.getSelectedBranchList, {
    path: Repo.getPath(),
  }).then((result) => {
    if (result.code === 200) {
      resolve(result.data);
    }
  });
});

const updateBranchLightmerge = async selectedBranchList => new Promise((resolve) => {
  Post(API.updateBranchLightmerge, {
    path: Repo.getPath(),
    list: selectedBranchList,
    ...Auth.getAuth(),
  }).then((result) => {
    if (result.code === 200) {
      resolve(result.data);
    }
  });
});

const getRecentRepos = async () => new Promise((resolve) => {
  Get(API.getRecentRepos).then((result) => {
    if (result.code === 200) {
      resolve(result.data);
    }
  });
});

export {
  getBranchList,
  getSelectedBranchList,
  updateBranchLightmerge,
  getRecentRepos,
};
