import gortrans from './chelgortrans';
import staticApi from './static';
import maps from './ymaps';


class Model {
  constructor() {
    this.gortrans = gortrans;
    this.static = staticApi;
    this.maps = maps;
  }
}

const model = new Model();

export default model;
