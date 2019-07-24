import _ from 'libs/lodash';


class ClearPage {
  constructor(count) {
    this.count = count || 1;
    this._reloadPageInterval = null;
  }

  _init(fn = _.noop) {
    const minute = 1000 * 60; // одна минута
    const count = minute * this.count; // количество минут
    this._reloadPageInterval = setInterval(() => {
      // const suggest = document.querySelector('#suggest');
      // const superlist = document.querySelector('#superlist');
      // if (suggest) document.querySelector('#suggest').value = '';
      // if (superlist) document.querySelector('#superlist').innerHTML = '';
      // fn();
      window.open('./index.php', '_self');
    }, count);
  }

  reset(fn) {
    clearInterval(this._reloadPageInterval);
    this._init(fn);
  }
}

const clear = new ClearPage();

export default clear;
