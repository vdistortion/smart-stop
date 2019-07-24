import events from 'libs/events';
import _ from 'libs/lodash';
import tpl from 'components/templates/templates';


class View {
  constructor() {
    this._initEvents();
  }

  _initEvents() {
    events.on('dblclick', '.js-reset', () => {
      localStorage.clear();
      window.open(window.location.href, '_self');
    });

    events.on('contextmenu', document, (e) => {
      e.preventDefault();
    });
  }

  render(data, template) {
    const markup = tpl.get(template);
    const compiled = _.template(markup);
    data._ = _;
    return compiled(data);
  }
}

const view = new View();

export default view;
