class Store {
  constructor() {
    this._map = null;
  }

  get map() {
    return this._map;
  }

  set map(map) {
    this._map = map;
  }
}

const store = new Store();

export default store;
