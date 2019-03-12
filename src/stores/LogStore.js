import { observable, action } from 'mobx';

export default class LogStore {
  @observable logs = [];

  @action addLog = (log) => {
    this.logs.push(log);
  };

  @action resetLogs = () => {
    this.logs = [];
  };
}
