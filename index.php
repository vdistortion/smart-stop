<!DOCTYPE html>
<html lang="ru-RU">
  <head>
    <title>Маршрут от точки на карте</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css">
    <link rel="stylesheet" href="./assets/styles.css?v=<?=rand()?>">
  </head>
  <body>
    <!-- data-id - id остановки -->
    <!-- default - 3510001 -->
    <!-- 3510001 - Детский мир -->
    <!-- 3510002 - Детский мир -->
    <!-- 3510003 - Площадь Революции -->
    <!-- 3510004 - Площадь Революции -->
    <!-- 3510005 - Публичная библиотека -->
    <div id="wrapper" data-id='3510005'>
      <button id="update" class="mdl-button mdl-button--raised mdl-button--colored" type="button">Обновить информацию</button>
      <div id="output"></div>
      <div id="viewContainer"></div>
      <div class="mdl-textfield mdl-js-textfield" style="width: 100%;max-width: 700px;">
        <input id="suggest" class="mdl-textfield__input" type="text">
        <label class="mdl-textfield__label" for="suggest">Поиск по Челябинску</label>
      </div>
      <div id="map"></div>
    </div>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"></script>
    <script src="https://code.getmdl.io/1.3.0/material.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="./assets/api.js?v=<?=rand()?>"></script>
    <script src="./assets/map.js?v=<?=rand()?>"></script>
  </body>
</html>
