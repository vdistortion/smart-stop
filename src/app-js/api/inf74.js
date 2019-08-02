import Ajax from 'root/common/ajax';

// http://transport.gis.inf74.ru/getroutes
class Transport {
  constructor() {

  }

  getRoutes(fn) {
    Ajax({
      action: '../api/inf74.php',
      success: (response) => {
        fn(response);
      },
    });

    setTimeout(() => {
      this.getRoutes(fn);
    }, 10000);
  }
}

const inf74 = new Transport();

export default inf74;
