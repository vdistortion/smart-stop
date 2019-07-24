import ready from 'root/common/ready';
import help from 'root/help';
import model from 'root/api/';
import header from 'components/header/header';
import tabs from 'components/tabs/tabs';
import api from 'components/route-list/route-list';


ready(() => {
  header();
  help.scrollInit();
  tabs();
  model.maps.init();
  api();
});
