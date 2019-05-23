let template = null;

getAPI();

let interval = setInterval(() => {
  getAPI();
}, 30000);

$(document).on('click', '#update', e => {
  getAPI();
  clearInterval(interval);
  interval = setInterval(() => {
    getAPI();
  }, 30000);
});

function getAPI() {

  let id = document.getElementById('wrapper').getAttribute('data-id');
  let date = new Date();
  let hours = twoNumber(date.getHours());
  let minutes = twoNumber(date.getMinutes());
  let seconds = twoNumber(date.getSeconds());

  let state = {
    update: `${hours}:${minutes}:${seconds}`,
    list: [],
    date: '',
    time: '',
    point: ''
  };

  $.get('./api/', {ID: Number(id)}, response => {

    _.each(response.split('\n'), item => {
      if (item) {
        let key = item.split('=')[0];
        let val = item.split('=')[1];

        if (key === 't') {
          let value = noQ(val);
          state.date = value.split(' ')[0];
          state.time = value.split(' ')[1];
        } else if (key === 's1') {
          state.point = noQ(val.split(',')[2]);
        } else if (key === 'm') {
          parseRoutes(noQ(val), state);
        } else {
          console.log('Непонятно что: '+item);
        }
      }
    });

    if (template === null) {
      $.get('./template.tpl', response => {
        template = response;
        render(template, state);
      });
    } else {
      render(template, state);
    }

  });

}

function render(tpl, state) {
  let compiled = _.template(tpl);
  document.getElementById('output').innerHTML = compiled(state);
}

function parseRoutes(str, state) {
  let key = str.split(';')[0];
  let val = str.split(';')[1];
  let list = {
    'АВ': 'Автобус',
    'ТБ': 'Троллейбус'
  };
  state.list.push({
    type: list[key.slice(0, 2)],
    name: key.slice(2, key.length),
    time: val.slice(0, val.length - 1) + ' мин.'
  });
}

function noQ(str) {
  // убираем кавычки
  return str.slice(1, (str.length - 1));
}

function twoNumber(date) {
  return ("0" + date).slice(-2);
}
