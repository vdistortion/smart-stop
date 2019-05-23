let myMap, ymapsRoutesString;
let ymapsRoutes = [];
let superlist = {
  temp: []
}

ymaps.ready(() => {

  let fromCoords = [55.160940, 61.411679];

  myMap = new ymaps.Map('map', {
      center: fromCoords,
      zoom: 12,
      controls: []
  });

  let suggestView = new ymaps.SuggestView('suggest', {
    provider: {
      suggest: request => ymaps.suggest("Челябинск," + request)
    }
  });

  suggestView.events.add('select', e => {

    $('.simple-keyboard').hide();

    ymaps.geocode(e.get('item').value).then(res => {

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
        multiRoute: true
      }).then(routes => {
          ymapsRoutesString = routes;
          $('#list').html(renderRoutes(routes));
          console.log(superlist);
          $.get('./list.tpl', tpl => {
            let compiled = _.template(tpl);
            document.getElementById('superlist').innerHTML = compiled(superlist);
            M.AutoInit();
          });
        }, error => {
          alert('Возникла ошибка: ' + error.message);
      });

    });
  });

});

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
