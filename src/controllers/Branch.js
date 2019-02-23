import { Get } from '../utils/network';

const API = {
  getBranchList: '/branch/list',
  getSelectedBranchList: '/branch/selected',
};

const getBranchList = (pathToRepo, setBranchList) => {
  Get(API.getBranchList, {
    path: pathToRepo,
  }).then((result) => {
    if (result.code === 200) {
      setBranchList(result.data);
    }
  }).catch((e) => {
    console.log(e);
  });
};

const getSelectedBranchList = (pathToRepo, setSelectedBranchList) => {
  Get(API.getSelectedBranchList, {
    path: pathToRepo,
  }).then((result) => {
    if (result.code === 200) {
      setSelectedBranchList(result.data);
    }
  }).catch((e) => {
    console.log(e);
  });
};

export { getBranchList, getSelectedBranchList };
