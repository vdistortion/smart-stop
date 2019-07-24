import events from 'libs/events';
import _ from 'libs/lodash';
import view from 'root/view';
import help from 'root/help';
import clear from 'root/common/clearPage';
import inf74 from './inf74';


class YandexAPI {
  constructor() {
    this.stopName = "пл. Революции";
    this.coords = [55.16041, 61.40567];
    this.suggests = [];
    this._map = null;
    this._zoom = 17;
    this._routes = [];
    this._routesStr = null;
    this.superlist = {
      temp: []
    };
  }

  init() {
    ymaps.ready(() => {
      if (this.isMap()) {
        this.map = new ymaps.Map('map', {
          center: this.coords,
          zoom: this._zoom,
          controls: []
        });

        this.empty();

        events.on('click', '.js-ymaps-route', e => {
          let el = e.target;
          let id = el.getAttribute('data-id');
          this._routesStr.setActiveRoute(this._routes[Number(id)]);
          this.map.geoObjects.add(this._routesStr);
          this.map.container.fitToViewport();
          this.map.setBounds(this.map.geoObjects.getBounds());
          this.reset();
        });

        // this.transportInit();

        if (this.isSearch()) this.searchInit();

        this.getAllRoutes();
      }
    });
  }

  getAllRoutes() {
    const id = document.body.getAttribute('data-route-id');
    const stop = document.body.getAttribute('data-api-static');
    const response = localStorage.getItem(stop);
    if (id && response) {
      const arData = JSON.parse(response);
      const arShape = arData.shapes[id];
      const arStops = arData.stops;

      if (Object.keys(arShape).length) {
        let shape = null;
        if (_.has(arShape, `${id}_a-b`)) {
          shape = arShape[`${id}_a-b`];
        } else if (_.has(arShape, `${id}_b-a`)) {
          shape = arShape[`${id}_b-a`];
        } else {
          shape = _.first(Object.values(arShape));
        }

        this.map.geoObjects.add(new ymaps.GeoObject({
          geometry: {
            type: "LineString",
            coordinates: shape
          }
        }, {
          strokeColor: "#ae81ff",
          strokeWidth: 5
        }));

        this.map.setBounds(this.map.geoObjects.getBounds());

        // let firstCoords = null;
        // let lastCoords = null;

        // _.each(shape, item => {
        //   if (firstCoords === null) {
        //     const key = item[0].toString() + item[1].toString();
        //     if (_.has(arStops, key)) firstCoords = arStops[key];
        //   }
        // });
        // _.eachRight(shape, item => {
        //   if (lastCoords === null) {
        //     const key = item[0].toString() + item[1].toString();
        //     if (_.has(arStops, key)) lastCoords = arStops[key];
        //   }
        // });

        // _.each([firstCoords, lastCoords], (point) => {
        //   this.map.geoObjects.add(new ymaps.GeoObject({
        //       geometry: {
        //         type: "Point",
        //         coordinates: point.coords
        //       },
        //       properties: {
        //         iconContent: point.name
        //       }
        //     }, {
        //       preset: 'islands#blackStretchyIcon',
        //       draggable: false,
        //       iconColor: '#084ac4'
        //   }));
        // });
      }
      this.reset();
    }
  }

  transportInit() {
    inf74.getRoutes((routes) => {
      _.each(routes, route => {
        this.map.geoObjects.add(new ymaps.GeoObject({
          geometry: {
            type: "Point",
            coordinates: route.coords
          },
          properties: {
            iconContent: route.number,
            hintContent: route.name
          }
        }, {
          preset: 'islands#circleIcon',
          draggable: false,
          iconColor: route.color
        }));
      });
    });
  }

  searchInit() {
    const suggestView = new ymaps.SuggestView('suggest', {
      provider: {
        suggest: request => {
          let suggest = ymaps.suggest("Челябинск," + request);
          suggest.then(items => {
            this.suggests = items;
          });
          return suggest;
        }
      }
    });

    suggestView.events.add('select', e => {
      this.drawingPaths(e.get('item').value);
      this.map.setZoom(this._zoom);
      this.map.setCenter(this.coords);
      this.map.container.fitToViewport();
      this.reset();
    });

    events.on('input', '#suggest', e => {
      this.reset();
    });
  }

  reset() {
    clear.reset();
  }

  empty() {
    if (this.isMap()) {
      this.map.geoObjects.removeAll();

      let marsruty = document.body.getAttribute('data-api-static');

      if (localStorage.getItem(marsruty)) {
        let response = JSON.parse(localStorage.getItem(marsruty));
        this.stopName = response.stop.name;
        this.coords = response.stop.coords;
      }

      this.map.geoObjects.add(new ymaps.GeoObject({
          geometry: {
            type: "Point",
            coordinates: this.coords
          },
          properties: {
            iconContent: '<b>ВЫ ЗДЕСЬ</b>'
          }
        }, {
          preset: 'islands#blackStretchyIcon',
          draggable: false,
          iconColor: '#084ac4'
      }));

      this.map.setZoom(this._zoom);
      this.map.setCenter(this.coords);
      this.map.container.fitToViewport();

      // this.transportInit();
    }
  }

  drawingPaths(value) {

      ymaps.geocode(value).then(res => {

        let newPath = res.geoObjects.get(0).properties.get('boundedBy');
        let coord1 = (newPath[1][0] - newPath[0][0]) / 2 + newPath[0][0];
        let coord2 = (newPath[1][1] - newPath[0][1]) / 2 + newPath[0][1];
        let toCoords = [coord1, coord2];

        this.empty();
        this.map.geoObjects.removeAll();
        this.map.geoObjects.add(new ymaps.multiRouter.MultiRoute({
          referencePoints: [
            this.coords,
            toCoords
          ],
          params: {
            routingMode: 'masstransit'
          }
        }, {
          boundsAutoApply: true
        }));

        ymaps.route([this.coords, toCoords], {
          routingMode: 'masstransit',
          mapStateAutoApply: true,
          multiRoute: true
        }).then(routes => {
            document.querySelector('#superlist').innerHTML = '';
            this._routesStr = routes;
            this.renderRoutes(routes);

            document.querySelector('#superlist').innerHTML = view.render(this.superlist, 'list');

            setTimeout(() => {
              this.map.setBounds(this.map.geoObjects.getBounds());
              this.map.container.fitToViewport();
            }, 0);
          }, error => {
            alert('Возникла ошибка: ' + error.message);
        });

      });

  }

  renderRoutes(routes) {
    this._routes = [];
    for (var i = 0; i < routes.getRoutes().getLength(); i++) {
      var route = routes.getRoutes().get(i);
      this._routes.push(route);
      this.superlist.temp[i] = {
        duration: route.properties.get("duration").text,
        distance: route.properties.get("distance").text,
        list: []
      };
      this.createRoute(route, this.superlist.temp[i]);
    }
  }

  createRoute(route, temp_i) {
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
    this.map.setBounds(this.map.geoObjects.getBounds());
  }

  isMap() {
    return document.querySelector('#map');
  }

  isSearch() {
    return document.querySelector('#suggest');
  }

  get map() {
    return this._map;
  }

  set map(map) {
    this._map = map;
  }
}

const map = new YandexAPI();

export default map;
