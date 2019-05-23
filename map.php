<!DOCTYPE html>
<html lang="ru-RU">
  <head>
    <title>Маршрут от точки на карте</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width">
    <!-- <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://code.getmdl.io/1.3.0/material.indigo-pink.min.css"> -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/css/index.css">
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
    <div class="container">
      <div class="row">
        <div class="col s12">
          <div id="wrapper" data-id='3510005'>
            <button id="update" class="waves-effect waves-light btn" type="button">Обновить информацию</button>
            <div id="output"></div>
            <div id="viewContainer"></div>
            <div class="input-field">
              <input id="suggest" type="text" value="Россия, Челябинск, улица 50-летия ВЛКСМ">
              <label for="suggest">Введите адрес для поиска маршрута</label>
            </div>
            <div id="superlist"></div>
            <div id="list"></div>
          </div>
          <div class="mapping">
            <div id="map"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="container simple-keyboard-wrapper">
      <div class="row" style="margin: 0;">
        <div class="col s12">
          <div class="simple-keyboard"></div>
        </div>
      </div>
    </div>
    <script src="https://api-maps.yandex.ru/2.1/?lang=ru_RU"></script>
    <!-- <script src="https://code.getmdl.io/1.3.0/material.min.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.0/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/simple-keyboard@latest/build/index.min.js"></script>
    <script src="./assets/api.js?v=<?=rand()?>"></script>
    <!-- <script src="./assets/map.js?v=<?=rand()?>"></script> -->
    <script src="./assets/index.js?v=<?=rand()?>"></script>
    <script>

      let Keyboard = window.SimpleKeyboard.default;
      let keyboard = new Keyboard({
        onChange: input => onChange(input),
        onKeyPress: button => onKeyPress(button),
        preventMouseDownDefault: true,
        // debug: true,
        layout: {
          default: [
            "\u0451 1 2 3 4 5 6 7 8 9 0 - {bksp}",
            "\u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a",
            "\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d",
            "\u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e {space}"
          ]
        },
        display: {
          '{bksp}': 'Backspace',
          '{space}': 'Space'
        }
      });

      /**
       * Update simple-keyboard when input is changed directly
       */
      document.querySelector("input").addEventListener("input", event => {
        keyboard.setInput(event.target.value);
      });

      function onChange(input) {
        document.querySelector("input").value = input;
      }

      function onKeyPress(button) {
        console.log(keyboard.input);
        console.log(keyboard.options.inputName);
        if (button === "{bksp}") handleBksp();
      }

      function handleBksp() {
        let input = document.querySelector("input");
        keyboard.setInput(input.value);
        input.value = input.value.substring(0, input.value.length - 1);
      }

      $('#suggest').on('focus', e => {
        $('.simple-keyboard').show();
      });

      $(document).mouseup(function (e){ // событие клика по веб-документу
        var div = $("#suggest, .simple-keyboard"); // тут указываем ID элемента
        if (!div.is(e.target) // если клик был не по нашему блоку
            && div.has(e.target).length === 0) { // и не по его дочерним элементам
          $('.simple-keyboard').hide(); // скрываем его
        }
      });

    </script>
  </body>
</html>
