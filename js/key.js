let Keyboard = window.SimpleKeyboard.default;
let keyboard = new Keyboard({
  onChange: input => onChange(input),
  onKeyPress: button => onKeyPress(button),
  preventMouseDownDefault: true,
  layout: {
    default: [
      "\u0451 1 2 3 4 5 6 7 8 9 0 - {bksp}",
      "\u0439 \u0446 \u0443 \u043a \u0435 \u043d \u0433 \u0448 \u0449 \u0437 \u0445 \u044a",
      "\u0444 \u044b \u0432 \u0430 \u043f \u0440 \u043e \u043b \u0434 \u0436 \u044d {enter}",
      "\u044f \u0447 \u0441 \u043c \u0438 \u0442 \u044c \u0431 \u044e",
      "{space}"
    ]
  },
  display: {
    '{bksp}': '&larr;',
    '{enter}': 'Enter &#8626;',
    '{space}': 'Space'
  }
});

document.querySelector("input").addEventListener("input", event => {
  // keyboard.setInput(event.target.value);
});

function onChange(input) {
  document.querySelector("input").value = input;
}

function onKeyPress(button) {
  if (button === "{bksp}") handleBksp();
  if (button === "{enter}") {
    if (suggests.length) drawingPaths(suggests[0].value);
  }
}

function handleBksp() {
  let input = document.querySelector("input");
  keyboard.setInput(input.value);
  input.value = input.value.substring(0, input.value.length - 1);
}

$('#suggest').on('focus', e => {
  // $('.simple-keyboard').show();
});

$(document).mouseup(e => { // событие клика по веб-документу
  var div = $("#suggest, .simple-keyboard"); // тут указываем ID элемента
  if (!div.is(e.target) // если клик был не по нашему блоку
      && div.has(e.target).length === 0) { // и не по его дочерним элементам
    $('.simple-keyboard').hide(); // скрываем его
  }
});
