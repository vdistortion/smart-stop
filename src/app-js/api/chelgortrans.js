import _ from 'libs/lodash';


class ChelgortransAPI {
  constructor() {
    this.marsruty = null;
  }

  init(secondsCount = 30) {
    this.start();

    setInterval(() => {
      this.start();
    }, 1000 * secondsCount);
  }

  start() {

  }
}

const gortrans = new ChelgortransAPI();

export default gortrans;
