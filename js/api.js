let template = null;
let templateAll = null;
let marsruty = null;
let setCenter = true;

getAll();
getAPI();

setInterval(() => {
  getAPI();
}, 30000);

function getAll() {

  let el = document.getElementById('output');
  marsruty = el.getAttribute('data-marsruty');

  if (localStorage.getItem(marsruty)) {
    let response = localStorage.getItem(marsruty);
    getAllCallback(JSON.parse(response));
  } else {
    axios.get('./api/', {
      params: {
        MR: Number(marsruty)
      }
    }).then(response => {
      localStorage.setItem(marsruty, JSON.stringify(response));
      getAllCallback(response);
    });
  }

}

function getAllCallback(response) {
    let output = document.getElementById('output-all');
    let hour = new Date().getHours();
    let minute = new Date().getMinutes();
    response.data.assoc = {
      tram: "Трамваи",
      trol: "Троллейбусы",
      bus: "Автобусы",
      seasonalbus: "Садовые маршруты"
    };
    response.data.time = {
      hour: ('0' + hour).slice(-2),
      minute: ('0' + minute).slice(-2)
    };

    setTimeout(() => {
      myMap.geoObjects.add(new ymaps.GeoObject({
        // Описание геометрии.
        geometry: {
          type: "Point",
          coordinates: response.data.stop.coords
        },
        properties: {
          iconContent: response.data.stop.name
        }
      }, {
        preset: 'islands#blackStretchyIcon',
        draggable: false
      }));
      if (setCenter) {
        myMap.setCenter(response.data.stop.coords);
        setCenter = false;
      }
    }, 1000);

    if (templateAll === null) {
      axios.get('./templates/all.tpl').then(tpl => {
        templateAll = tpl.data;
        output.innerHTML = render(templateAll, response.data);
      });
    } else {
      output.innerHTML = render(templateAll, response.data);
    }
}

function getAPI() {

  let el = document.getElementById('output');
  let id = el.getAttribute('data-id');

  let state = {
    list: [],
    time: ''
  };

  axios.get('./api/', {
    params: {
      ID: Number(id)
    }
  }).then(response => {

    _.each(response.data.split('\n'), item => {
      if (item) {
        let key = item.split('=')[0];
        let val = item.split('=')[1];
        let hour = new Date().getHours();
        let minute = new Date().getMinutes();
        state.hour = ('0' + hour).slice(-2);
        state.minute = ('0' + minute).slice(-2);

        if (key === 'm') {
          parseRoutes(noQ(val), state);
        }
      }
    });

    let output = document.getElementById('output');
    let db = localStorage.getItem(marsruty);

    if (db) {
      db = JSON.parse(db);
      _.eachRight(state.list, active => {
        _.each(db.data.routes[active.type], (list, i, array) => {
          if (list.name === active.name) {
            list.time = active.time;
            let item = array.splice(i, 1);
            array.unshift(item[0]);
          }
        });
      });
      getAllCallback(db);
      output.innerHTML = '';
    } else {

      if (template === null) {
        axios.get('./templates/api.tpl').then(response => {
          template = response.data;
          output.innerHTML = render(template, state);
        });
      } else {
        output.innerHTML = render(template, state);
      }

    }

  });

}

function render(tpl, state) {
  let compiled = _.template(tpl);
  return compiled(state);
}

function parseRoutes(str, state) {
  let key = str.split(';')[0];
  let val = str.split(';')[1];
  let list = {
    'АВ': 'bus',
    'ТБ': 'trol'
  };
  state.list.push({
    type: list[key.slice(0, 2)],
    name: key.slice(2, key.length),
    time: val.slice(0, val.length - 1)
  });
}

function noQ(str) {
  // убираем кавычки
  return str.slice(1, (str.length - 1));
}

function twoNumber(date) {
  return ("0" + date).slice(-2);
}

if ($('[data-reset="y"]').length) {
  localStorage.clear();
  location.href = location.href.split('?')[0];
}

document.addEventListener('contextmenu', e => e.preventDefault());

// window.addEventListener("touchstart", touchHandler, false);

// function touchHandler(e){
//     if (e.touches.length > 1) {
//         e.preventDefault();
//     }
// }
