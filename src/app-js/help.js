import SimpleBar from 'simplebar';
import _ from 'libs/lodash';

class Helper {
  constructor() {
    this._els = document.querySelectorAll('[data-scrollbar]');
  }

  scrollInit() {
    _.each(this._els, (el) => {
      el.removeAttribute('data-simplebar');
      new SimpleBar(el);
    });
  }
}

const help = new Helper();

export default help;
