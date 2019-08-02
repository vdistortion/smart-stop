import _ from 'libs/lodash';
import view from 'root/view';
import help from 'root/help';
import model from 'root/api/';
import Ajax from 'root/common/ajax';

export default () => {
  let marsruty = null;

  getAll();
  getAPI();

  setInterval(() => {
    getAPI();
  }, 30000);

  function getAll() {
    marsruty = document.body.getAttribute('data-api-static');

    if (!localStorage.getItem(marsruty)) {
      Ajax({
        action: '../api/static.php',
        data: {
          ID: marsruty,
        },
        success: response => {
          localStorage.setItem(marsruty, JSON.stringify(response));

          getAPI();
        },
      });
    }
  }

  function getAllCallback(response) {
    let output = document.querySelector('#output-all');

    if (!output) return;

    model.maps.empty();

    output.innerHTML = view.render(response, 'all');

    help.scrollInit();
  }

  function getAPI() {

    const id = document.body.getAttribute('data-api-chelgortrans');

    const state = [];

    Ajax({
      action: '../api/chelgortrans.php',
      data: {
        ID: id,
      },
      success: response => {

        _.each(response.split('\n'), item => {
          if (item) {
            let key = item.split('=')[0];
            let val = item.split('=')[1];

            if (key === 'm') {
              let value = noQ(val);
              if (value) parseRoutes(value, state);
            }
          }
        });

        state.sort((a, b) => {
          return a.time - b.time;
        });

        let db = localStorage.getItem(marsruty);

        if (db) {
          db = JSON.parse(db);
          _.eachRight(state, active => {
            _.each(db.routes, (list, i, array) => {
              if (list.name === active.name && list.type === active.type) {
                list.time = active.time;
                let item = array.splice(i, 1);
                array.unshift(item[0]);
              }
            });
          });

          getShortRoutes(db.routes, state.length);
          getAllCallback(db);
        }

      }
    });

  }

  function getShortRoutes(routes, count) {
    const short = document.querySelector('#short');

    if (!short) return;

    let shortCount = (count > 6) ? 6 : count;

    if (shortCount === 0) {
      short.innerHTML = view.render({}, 'empty');
    } else {
      short.innerHTML = view.render({routes, shortCount}, 'short');
      model.maps.map.container.fitToViewport();

      if (model.maps.leafletMAP) {
        model.maps.leafletMAP.setView(model.maps.coords, model.maps._zoom);
      }
    }
  }

  function parseRoutes(str, state) {
    let key = str.split(';')[0];
    let val = str.split(';')[1];
    let list = {
      'ТБ': 'trol',
      'АВ': 'bus',
    };
    state.push({
      type: list[key.slice(0, 2)],
      name: key.slice(2, key.length),
      time: Number(val.slice(0, val.length - 1))
    });
  }

  function noQ(str) {
    // убираем кавычки
    return str.slice(1, (str.length - 1));
  }

  function twoNumber(date) {
    return ("0" + date).slice(-2);
  }
};
