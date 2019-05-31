let myMap, ymapsRoutesString;
let fromCoords = [55.160267, 61.396717];
let ymapsRoutes = [];
let suggests = [];
let superlist = {
  temp: []
}

ymaps.ready(() => {

  myMap = new ymaps.Map('map', {
      center: fromCoords,
      zoom: 17,
      controls: []
  });

  let suggestView = new ymaps.SuggestView('suggest', {
    provider: {
      suggest: request => {
        let suggest = ymaps.suggest("Челябинск," + request);
        suggest.then(items => {
          suggests = items;
        });
        return suggest;
      }
    }
  });

  $(document).on('click', '.js-search-button', e => {
    if (suggests.length) drawingPaths(suggests[0].value);
  });

  suggestView.events.add('select', e => {
    drawingPaths(e.get('item').value);
  });

});

function drawingPaths(value) {

    $('.simple-keyboard').hide();

    ymaps.geocode(value).then(res => {

      let newPath = res.geoObjects.get(0).properties.get('boundedBy');
      let coord1 = (newPath[1][0] - newPath[0][0]) / 2 + newPath[0][0];
      let coord2 = (newPath[1][1] - newPath[0][1]) / 2 + newPath[0][1];
      let toCoords = [coord1, coord2];

      myMap.geoObjects.removeAll().add(new ymaps.multiRouter.MultiRoute({
        referencePoints: [
          fromCoords,
          toCoords
        ],
        params: {
          routingMode: 'masstransit'
        }
      }, {
        boundsAutoApply: true
      }));

      ymaps.route([fromCoords, toCoords], {
        routingMode: 'masstransit',
        mapStateAutoApply: true,
        multiRoute: true
      }).then(routes => {
          document.getElementById('superlist').innerHTML = '';
          ymapsRoutesString = routes;
          $('#list').html(renderRoutes(routes));
          axios.get('./templates/list.tpl').then(response => {
            let compiled = _.template(response.data);
            document.getElementById('superlist').innerHTML = compiled(superlist);
            try {
              M.AutoInit();
            } catch (e) {}
            setTimeout(() => {
              myMap.setBounds(myMap.geoObjects.getBounds());
              myMap.container.fitToViewport();
            }, 0);
          });
        }, error => {
          alert('Возникла ошибка: ' + error.message);
      });

    });

}

function renderRoutes(routes) {
  ymapsRoutes = [];
  for (var i = 0; i < routes.getRoutes().getLength(); i++) {
    var route = routes.getRoutes().get(i);
    ymapsRoutes.push(route);
    superlist.temp[i] = {
      duration: route.properties.get("duration").text,
      distance: route.properties.get("distance").text,
      list: []
    };
    createRoute(route, superlist.temp[i]);
  }
}

function createRoute(route, temp_i) {
  var transports = {
    tramway: 'Трамвай',
    trolleybus: 'Троллейбус',
    bus: 'Автобус',
    minibus: 'Маршрутка'
  };
  for (var i = 0, l = route.getPaths().getLength(); i < l; i++) {
    var path = route.getPaths().get(i);
    for (var j = 0, k = path.getSegments().getLength(); j < k; j++) {
      var point = path.getSegments().get(j).properties;
      if (point.get("transports") != undefined) {
        temp_i.list.push(point.get("text"));
        console.log('`');
        point.get("transports").forEach(transport => {
          console.log(transports[transport.type] + ": " + transport.name);
        });
      }
    }
  }
}

$(document).on('click', '.js-ymaps-route', e => {
  let el = $(e.currentTarget);
  let id = el.attr('data-id');
  ymapsRoutesString.setActiveRoute(ymapsRoutes[Number(id)]);
  myMap.geoObjects.removeAll().add(ymapsRoutesString);
});
