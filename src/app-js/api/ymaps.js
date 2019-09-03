import events from 'libs/events';
import _ from 'libs/lodash';
import view from 'root/view';
import help from 'root/help';
import clear from 'root/common/clearPage';
import inf74 from './inf74';


class YandexAPI {
  constructor() {
    this.leaflet = document.querySelector('#leaflet');
    this.leafletMAP = null;
    this.leafletLAYER = null;
    this.leafletDB = {};
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

          if (this.leaflet) {
            this.leaflet.classList.add('b-hidden')
          }
        });

        this.leafletInit();
        this.transportInit();

        if (this.isSearch()) this.searchInit();

        this.getAllRoutes();
      }
    });
  }

  leafletInit() {
    if (!this.leaflet) return;

    this.leafletMAP = L.map('leaflet', {
      center: this.coords,
      zoom: this._zoom,
      scrollWheelZoom: false,
      zoomControl: false,
      attributionControl: false,
      closePopupOnClick: false
    });

    const stop = L.marker([55.16041, 61.40567], {
      icon: L.divIcon({
        html: `
        <div style="
          width: 54px;
          height: 54px;
          box-shadow: 0 11px 13px rgba(0, 0, 0, 0.47);
          border: 5px solid #ffffff;
          background-color: #084ac4;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translateX(-50%);
          z-index: 4;
        "></div>`
      })
    }).addTo(this.leafletMAP);

    stop.bindPopup(`
      <div style='text-align: center; color: #084ac4; font-size: 30px; font-weight: 700;'>ВЫ ЗДЕСЬ</div>
      <div style='text-align: center; font-size: 24px;'>ост. Пл. Революции</div>`, {
      closeButton: false,
      closeOnClick: false
    }).openPopup();

    this.leafletLAYER = L.layerGroup().addTo(this.leafletMAP);

    L.yandex().addTo(this.leafletMAP);
  }

  getAllRoutes() {
    const id = document.body.getAttribute('data-route-id');
    const stop = document.body.getAttribute('data-api-static');
    const response = localStorage.getItem(stop);
    if (id && response) {
      const arData = JSON.parse(response);
      const arShape = arData.shapes[id];
      const arStops = arData.stops;

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
    inf74.getRoutes((data) => {
      const arNew = Object.keys(data);
      const arOld = Object.keys(this.leafletDB);
      const add = arNew.filter(el => !arOld.includes(el));
      const del = arOld.filter(el => !arNew.includes(el));

      _.each(add, id => {
        const route = data[id];

        const marker = L.animatedMarker([route.coords], {
          icon: L.divIcon({
            html: view.render(route, 'marker')
          }),
          title: route.name,
          riseOnHover: true,
          interval: 30000
        }).addTo(this.leafletLAYER);

        this.leafletDB[id] = {
          route,
          marker,
          coords: [route.coords]
        };
      });

      _.each(del, id => {
        this.leafletMAP.removeLayer(this.leafletDB[id].marker);
        delete this.leafletDB[id];
      });

      _.each(data, (route, key) => {
        if (![...add, ...del].includes(key)) {
          const moveRoute = this.leafletDB[key];
          const marker = moveRoute.marker;
          const el = document.querySelector(`.js-marker-azimuth[data-id="${key}"]`);
          if (el && route.azimuth) el.style.transform = `rotate(${route.azimuth}deg)`;
          moveRoute.coords.push(route.coords);
          // console.log(moveRoute.coords);
          if (moveRoute.coords.length > 4) {
            moveRoute.coords.shift();
          }
          if (moveRoute.coords.length > 3) {
            marker.setLine(moveRoute.coords);
            marker.start();
          }
        }
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

      if (this.leaflet) {
        this.leaflet.classList.add('b-hidden')
      }
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

      this.map.setZoom(this._zoom);
      this.map.setCenter(this.coords);
      this.map.container.fitToViewport();

      this.transportInit();
    }

    if (this.leafletMAP) {
      this.leafletMAP.setView(this.coords, this._zoom);
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
