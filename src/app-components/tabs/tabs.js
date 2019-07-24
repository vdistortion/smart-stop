import events from 'libs/events';
import _ from 'libs/lodash';


export default () => {
  const selector = '.js-tab';

  events.on('click', selector, (e) => {
    const id = e.target.getAttribute('data-from');
    const tabs = document.querySelectorAll(selector);

    _.each(tabs, (tab) => {
      if (tab !== this) {
        tab.classList.remove('b-active');
        _.each(document.querySelectorAll('.js-tabs [data-to]'), (el) => {
          el.setAttribute('hidden', 'hidden');
        });
      }
    });

    e.target.classList.add('b-active');
    document.querySelector(`.js-tabs [data-to="${id}"]`).removeAttribute('hidden');
  });
};
