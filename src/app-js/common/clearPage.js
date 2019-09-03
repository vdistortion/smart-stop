class ClearPage {
  constructor(count) {
    this.count = count || 1;
    this.private = {
      reloadPageInterval: null,
    };
  }

  _init() {
    const minute = 1000 * 60; // одна минута
    const count = minute * this.count; // количество минут
    this.private.reloadPageInterval = setInterval(() => {
      window.open('./index.php', '_self');
    }, count);
  }

  reset() {
    clearInterval(this.private.reloadPageInterval);
    this._init();
  }
}

const clear = new ClearPage();

export default clear;
