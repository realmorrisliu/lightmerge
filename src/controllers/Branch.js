import { Get, Post } from '../utils/network';
import Repo from '../utils/repo';

const API = {
  getBranchList: '/branch/list',
  getSelectedBranchList: '/branch/selected',
  updateBranchLightmerge: '/branch/lightmerge',
};

const getBranchList = (setBranchList) => {
  Get(API.getBranchList, {
    path: Repo.getPath(),
  }).then((result) => {
    if (result.code === 200) {
      setBranchList(result.data);
    }
  }).catch((e) => {
    console.log(e);
  });
};

const getSelectedBranchList = (setSelectedBranchList) => {
  Get(API.getSelectedBranchList, {
    path: Repo.getPath(),
  }).then((result) => {
    if (result.code === 200) {
      setSelectedBranchList(result.data);
    }
  }).catch((e) => {
    console.log(e);
  });
};

const updateBranchLightmerge = (selectedBranchList) => {
  Post(API.updateBranchLightmerge, {
    path: Repo.getPath(),
    list: selectedBranchList,
  }).then((result) => {
    if (result.code === 200) {
      console.log(result.message);
    }
  });
};

export { getBranchList, getSelectedBranchList, updateBranchLightmerge };
