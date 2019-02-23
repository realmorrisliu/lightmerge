import { Post } from '../utils/network';

const API = {
  getBranchList: '/repo/branch/list',
};

const getBranchList = (pathToRepo, setBranchList) => {
  Post(API.getBranchList, {
    path: pathToRepo,
  }).then((result) => {
    if (result.code === 200) {
      setBranchList(result.data);
    }
  }).catch((e) => {
    console.log(e);
  });
};

const getBranchByName = (name) => {
  console.log(name);
};

export { getBranchList, getBranchByName };
