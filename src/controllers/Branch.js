import { Get, Post } from '../utils/network';
import Auth from '../utils/auth';
import store from '../stores/RootStore';

const API = {
  getBranchList: '/branch/list',
  getSelectedBranchList: '/branch/selected',
  updateBranchLightmerge: '/branch/lightmerge',
  getRecentRepos: '/repo/list',
  pullLatestCode: '/repo/pull',
  deploy: '/deploy',
};

const getBranchList = async () => new Promise((resolve) => {
  Get(API.getBranchList, {
    path: store.repo.path,
  }).then((result) => {
    if (result.code === 200) {
      resolve(result.data);
    }
  });
});

const getSelectedBranchList = async () => new Promise((resolve) => {
  Get(API.getSelectedBranchList, {
    path: store.repo.path,
  }).then((result) => {
    if (result.code === 200) {
      resolve(result.data);
    }
  });
});

const updateBranchLightmerge = async selectedBranchList => new Promise((resolve) => {
  Post(API.updateBranchLightmerge, {
    path: store.repo.path,
    list: selectedBranchList,
    base: store.repo.base,
  }).then((result) => {
    if (result.code === 200) {
      resolve(result.error);
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

const pullLatestCode = async () => new Promise((resolve) => {
  Post(API.pullLatestCode, {
    path: store.repo.path,
    ...Auth.getAuth(),
  }).then((result) => {
    if (result.code === 200) {
      resolve(result.error);
    }
  });
});

const deploy = async () => new Promise((resolve) => {
  Post(API.deploy, {
    path: store.repo.path,
  }).then((result) => {
    if (result.code === 200) {
      resolve(result);
    }
  });
});

export {
  getBranchList,
  getSelectedBranchList,
  updateBranchLightmerge,
  getRecentRepos,
  pullLatestCode,
  deploy,
};
