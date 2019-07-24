import _ from 'libs/lodash';
import DateTime from 'root/common/DateTime';


function newDate() {
  return {
    date: DateTime.format({
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'short',
    }),
    time: DateTime.format({
      hour: 'numeric',
      minute: 'numeric',
    }),
  };
}

function writeData() {
  const data = newDate();

  _.each(data, (item, key) => {
    if (key === 'time') item = _.replace(item, ':', '<span class="header__pulse">:</span>');
    document.querySelector(`.js-${key}`).innerHTML = item;
  });
}

export default () => {
  writeData();

  setInterval(() => {
    writeData();
  }, 1000 * 60);
};
