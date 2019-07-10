<!DOCTYPE html>
<html lang="ru-RU">
  <head>
    <title>Маршрут от точки на карте</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, user-scalable=no">
    <link rel="icon" href="https://www.is74.ru/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,500,700&display=swap&subset=cyrillic">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css">
    <link rel="stylesheet" href="./css/styles.css?v=<?=rand()?>">
    <link rel="stylesheet" href="./css/new.css?v=<?=rand()?>">
  </head>
  <body>
    <?/*
      data-id - id остановки
      3510001 - Детский мир
      3510002 - Детский мир
      3510003 - Площадь Революции
      3510004 - Площадь Революции
      3510005 - Публичная библиотека
    */?>
    <? $reset = ($_GET["RESET"] === "Y") ? 'data-reset="y"' : ''; ?>

    <main class="is-container">
      <!-- <a href="http://zvo.arb.szdl.ru/ymaps/?RESET=Y">RESET</a> -->
      <div id="output" data-id="3510003" data-marsruty="199" <?=$reset?> hidden>
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
      <div id="output-all">
        <div class="progress">
          <div class="indeterminate"></div>
        </div>
      </div>
      <div class="search">
        <div class="wrapper">
          <div class="search__row">
            <input id="suggest" class="search__input browser-default" type="text" placeholder="Введите название остановки">
            <button class="search__button js-search-button" type="submit">Найти</button>
          </div>
        </div>
      </div>
      <div class="result">
        <div class="wrapper">
          <div id="superlist"></div>
        </div>
      </div>
      <div class="ymaps">
        <div class="ymaps__wrap">
          <div id="map"></div>
        </div>
      </div>
    </main>

    <div class="simple-keyboard b-hide"></div>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.min.js"></script>
    <script src="./js/map.js?v=<?=rand()?>"></script>
    <script src="./js/api.js?v=<?=rand()?>"></script>
    <script src="./js/key.js?v=<?=rand()?>"></script>
  </body>
</html>
