ymaps.modules.define('MultiRouteCustomView', ['util.defineClass'], function (provide, defineClass) {
  // Класс простого текстового отображения модели мультимаршрута.
  function CustomView (multiRouteModel) {
    this.multiRouteModel = multiRouteModel;
    // Объявляем начальное состояние.
    this.state = "init";
    this.stateChangeEvent = null;
    // Элемент, в который будет выводиться текст.
    $('#viewContainer').empty();
    this.outputElement = $('<div></div>').appendTo('#viewContainer');

    this.rebuildOutput();

    // Подписываемся на события модели, чтобы
    // обновлять текстовое описание мультимаршрута.
    multiRouteModel.events.add(["requestsuccess", "requestfail", "requestsend"], this.onModelStateChange, this);
  }

  // Таблица соответствия идентификатора состояния имени его обработчика.
  CustomView.stateProcessors = {
    init: "processInit",
    requestsend: "processRequestSend",
    requestsuccess: "processSuccessRequest",
    requestfail: "processFailRequest"
  };

  // Таблица соответствия типа маршрута имени его обработчика.
  CustomView.routeProcessors = {
    "masstransit": "processMasstransitRoute"
  };

  defineClass(CustomView, {
    // Обработчик событий модели.
    onModelStateChange: function (e) {
      // Запоминаем состояние модели и перестраиваем текстовое описание.
      this.state = e.get("type");
      this.stateChangeEvent = e;
      this.rebuildOutput();
    },

    rebuildOutput: function () {
      // Берем из таблицы обработчик для текущего состояния и исполняем его.
      var processorName = CustomView.stateProcessors[this.state];
      this.outputElement.html(
        this[processorName](this.multiRouteModel, this.stateChangeEvent)
      );
    },

    processInit: function () {
      return "Инициализация ...";
    },

    processRequestSend: function () {
      return "Запрос данных ...";
    },

    processSuccessRequest: function (multiRouteModel, e) {
      var routes = multiRouteModel.getRoutes(),
          result = ["Данные успешно получены."];
      if (routes.length) {
        result.push("Всего маршрутов: " + routes.length + ".");
        for (var i = 0, l = routes.length; i < l; i++) {
          result.push(this.processRoute(i, routes[i]));
        }
      } else {
        result.push("Нет маршрутов.");
      }
      return result.join("<br/>");
    },

    processFailRequest: function (multiRouteModel, e) {
      return e.get("error").message;
    },

    processRoute: function (index, route) {
      // Берем из таблицы обработчик для данного типа маршрута и применяем его.
      var processorName = CustomView.routeProcessors[route.properties.get("type")];
      return (index + 1) + ". " + this[processorName](route);
    },

    processMasstransitRoute: function (route) {
      var result = ["Маршрут на общественном транспорте."];
      result.push(this.createCommonRouteOutput(route));
      result.push("Описание маршута: <ul>" + this.createMasstransitRouteOutput(route) + "</ul>");
      return result.join("<br/>");
    },

    // Метод, формирующий общую часть описания для всех типов маршрутов.
    createCommonRouteOutput: function (route) {
      return "Протяженность маршрута: " + route.properties.get("distance").text + "<br/>" +
             "Время в пути: " + route.properties.get("duration").text;
    },

    // Метод, строящий список текстовых описаний для
    // всех сегментов маршрута на общественном транспорте.
    createMasstransitRouteOutput: function (route) {
      var result = [];
      var transports = {
        tramway: 'Трамвай',
        trolleybus: 'Троллейбус',
        bus: 'Автобус',
        minibus: 'Маршрутка'
      };
      for (var i = 0, l = route.getPaths().length; i < l; i++) {
        var path = route.getPaths()[i];
        for (var j = 0, k = path.getSegments().length; j < k; j++) {
          var point = path.getSegments()[j].properties;
          result.push("<li>" + point.get("text") + "</li>");
          if (point.get("transports") != undefined) {
            console.log('***');
            point.get("transports").forEach(function(transport) {
              console.log(transports[transport.type] + ": " + transport.name);
            });
          }
        }
      }
      return result.join("");
    },

    destroy: function () {
      this.outputElement.remove();
      this.multiRouteModel.events.remove(["requestsuccess", "requestfail", "requestsend"], this.onModelStateChange, this);
    }
  });

  provide(CustomView);

});

function init () {
  // Создаем модель мультимаршрута.
  var multiRouteModel = new ymaps.multiRouter.MultiRouteModel([
    [55.160940, 61.411679]
  ], {
    // Тип маршрута: на общественном транспорте.
    routingMode: "masstransit",
    // Путевые точки можно перетаскивать.
    // Маршрут при этом будет перестраиваться.
    wayPointDraggable: true,
    boundsAutoApply: true
  });

  // Создаем карту с добавленной на нее кнопкой.
  var myMap = new ymaps.Map('map', {
      center: [55.160940, 61.411679],
      zoom: 9,
      // controls: ['routePanelControl']
      controls: []
    }, {
      buttonMaxWidth: 1000
    }),

    // Создаем на основе существующей модели мультимаршрут.
    multiRoute = new ymaps.multiRouter.MultiRoute(multiRouteModel, {
      // Путевые точки можно перетаскивать.
      // Маршрут при этом будет перестраиваться.
      wayPointDraggable: true,
      boundsAutoApply: true
    });

  // Добавляем мультимаршрут на карту.
  myMap.geoObjects.add(multiRoute);

  // var control = myMap.controls.get('routePanelControl');

  // control.options.set({
  //   // Список всех опций см. в справочнике.
  //   maxWidth: '1000',
  //   float: 'left',
  //   // Задание заголовка для панели.
  //   title: 'Заголовок панели',
  //   // Включить отображение заголовка.
  //   showHeader: true
  // });

  // // Зададим состояние панели для построения машрутов.
  // control.routePanel.state.set({
  //   // Тип маршрутизации.
  //   type: 'masstransit',
  //   // Выключим возможность задавать пункт отправления в поле ввода.
  //   fromEnabled: false,
  //   // Адрес или координаты пункта отправления.
  //   from: [55.160940, 61.411679],
  //   // Включим возможность задавать пункт назначения в поле ввода.
  //   toEnabled: true
  // });

  // // Зададим опции панели для построения машрутов.
  // control.routePanel.options.set({
  //   // Запрещаем показ кнопки, позволяющей менять местами начальную и конечную точки маршрута.
  //   allowSwitch: true,
  //   // Включим определение адреса по координатам клика.
  //   // Адрес будет автоматически подставляться в поле ввода на панели, а также в подпись метки маршрута.
  //   reverseGeocoding: true,
  //   // Зададим виды маршрутизации, которые будут доступны пользователям для выбора.
  //   types: { masstransit: true }
  // });

  // control.routePanel.geolocate('from');

  // var multiRoutePromise = control.routePanel.getRouteAsync();

  // multiRoutePromise.then(function(multiRoute) {
  //   // Подписка на событие обновления мультимаршрута.
  //   multiRoute.model.events.add('requestsend', function(e) {
  //     var newPath = e.get('referencePoints');
  //     if (newPath[1]) {
  //       multiRouteModel.setReferencePoints(newPath);
  //       ymaps.modules.require([
  //         'MultiRouteCustomView'
  //       ], function (MultiRouteCustomView) {
  //         // Создаем экземпляр текстового отображения модели мультимаршрута.
  //         new MultiRouteCustomView(multiRouteModel);
  //       });
  //     } else {
  //       $('#viewContainer').empty();
  //     }
  //   });
  // }, function (err) {
  //   console.log(err); 
  // });

  var suggestView = new ymaps.SuggestView('suggest', {
    provider: {
      suggest: (request, options) => {
        return ymaps.suggest("Челябинск, " + request);
      }
    }
  });

  suggestView.events.add('select', function(e) {
    ymaps.geocode(e.get('item').value).then(function(res) {
      var newPath = res.geoObjects.get(0).properties.get('boundedBy');
      if (newPath[1]) {
        let coord1 = (newPath[1][0] - newPath[0][0]) / 2 + newPath[0][0];
        let coord2 = (newPath[1][1] - newPath[0][1]) / 2 + newPath[0][1];
        // control.routePanel.options.set('to', newPath);
        multiRouteModel.setReferencePoints([[55.160940, 61.411679], [coord1, coord2]]);
        ymaps.modules.require([
          'MultiRouteCustomView'
        ], function (MultiRouteCustomView) {
          // Создаем экземпляр текстового отображения модели мультимаршрута.
          new MultiRouteCustomView(multiRouteModel);
        });
      } else {
        $('#viewContainer').empty();
      }
    });
  });

  // var searchControl = new ymaps.control.SearchControl({
  //   options: {
  //     float: 'right',
  //     floatIndex: 100,
  //     noPlacemark: true,
  //     provider: 'yandex#search'
  //   }
  // });
  // myMap.controls.add(searchControl);

  // searchControl.events.add('submit', function () {
  //   console.log('request: ' + searchControl.getRequestString());
  // }, this);

}

ymaps.ready(init);
