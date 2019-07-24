class Tpl {
  constructor() {
    this._templates = document.querySelector('#templates');
  }

  get(name) {
    if (name) return this._templates.querySelector(`[type="text/template"][data-name="${name}"]`).textContent;

    return this._templates.querySelectorAll('[type="text/template"]');
  }
}

const tpl = new Tpl();

export default tpl;
