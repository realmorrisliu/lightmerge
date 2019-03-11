import React from 'react';
import { observer } from 'mobx-react';
import SingleBranch from '../SingleBranch';
import GroupBranch from '../GroupBranch';
import Loading from '../Loading';
import store from '../../stores/RootStore';
import './BranchSelector.scss';

@observer
class BranchSelector extends React.Component {
  handleBranchSelection = (branchName) => {
    const { repo } = store;
    repo.resetLightmerge();

    if (repo.selectedBranches.includes(branchName)) {
      repo.updateSelectedBranches(repo.selectedBranches.filter(branch => branch !== branchName));
    } else {
      repo.updateSelectedBranches(repo.selectedBranches.concat(branchName));
    }
  };

  render() {
    const { repo } = store;
    const branches = {};
    repo.branches.forEach((branch) => {
      const [name, sub] = branch.split('/');

      if (!branches[name]) {
        branches[name] = {
          checked: repo.selectedBranches.includes(name),
          subBranches: [],
        };
      }
      if (sub) {
        branches[name].subBranches.push({
          name: sub,
          checked: repo.selectedBranches.includes(branch),
        });
      }
    });

    return (
      <div className="Branch">
        <h2 className="Title">Select Branches</h2>
        {
          repo.isBranchesLoading
            ? <Loading />
            : (
              <div className="List">
                {
                  Object.entries(branches).map(([branch, { checked, subBranches }]) => {
                    const folded = subBranches.every(subBranch => subBranch.checked === false);

                    return (
                      subBranches.length === 0
                        ? (
                          <SingleBranch
                            key={branch}
                            text={branch}
                            checked={checked}
                            isGroup={false}
                            onClick={() => {
                              this.handleBranchSelection(branch);
                            }}
                          />
                        )
                        : (
                          <GroupBranch
                            key={branch}
                            text={branch}
                            folded={folded}
                            subBranches={subBranches}
                            onChildClicked={this.handleBranchSelection}
                          />
                        )
                    );
                  })
                }
              </div>
            )
        }
      </div>
    );
  }
}

export default BranchSelector;
