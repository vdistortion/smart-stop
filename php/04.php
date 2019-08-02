<?php $type = (isset($_GET['type'])) ? $_GET['type'] : ''; ?>
<?php $name = (isset($_GET['name'])) ? $_GET['name'] : ''; ?>
<?php $route = (isset($_GET['route'])) ? $_GET['route'] : ''; ?><?php $chelgortrans = (isset($_GET['CHELGORTRANS'])) ? $_GET['CHELGORTRANS'] : 3510004; ?>
<?php $static = (isset($_GET['STATIC'])) ? $_GET['STATIC'] : 199; ?>
<?php $id = (isset($_GET['id'])) ? $_GET['id'] : ''; ?>
<?php require_once("../_template.path.php"); ?><!DOCTYPE html>
<html lang="ru-RU">
  <head>
    <title>Детальная карта маршрута</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no,user-scalable=no">
    <meta name="format-detection" content="telephone=no">
    <meta name="description" content="">
    <meta name="keywords" content="">
    <meta name="author" content="Baryonyx">
    <meta name="copyright" content="<?=date("Y")?>">
    <link rel="icon" href="<?=SITE_TEMPLATE_PATH?>/favicon.ico" type="image/x-icon">
    <link rel="shortcut icon" href="<?=SITE_TEMPLATE_PATH?>/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/leaflet/leaflet.css">
    <link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/leaflet/MarkerCluster.css">
    <link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/leaflet/MarkerCluster.Default.css">
    <link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/vendor.min.css?v=<?=rand()?>">
    <link rel="stylesheet" href="<?=SITE_TEMPLATE_PATH?>/template_styles.css?v=<?=rand()?>">
  </head>
  <body data-api-chelgortrans="<?=$chelgortrans?>" data-api-static="<?=$static?>" data-route-id="<?=$id?>"><?php require_once("../images/svg/symbols.svg"); ?>
    <main class="l-page">
      <header class="header js-reset">
        <div class="l-wrapper">
          <div class="header__wrapper">
            <div class="header__date js-date"></div>
            <div class="header__time js-time"><?=date("H:i")?></div>
          </div>
        </div>
      </header>
      <div class="route-header route-header--<?=$type?>">
        <div class="l-wrapper">
          <div class="route-header__title"><a class="route-header__back" href="./index.php">№<?=$name?></a>
            <div class="route-header__total"><b><?=$route?></b></div>
          </div>
        </div>
      </div>
      <div class="l-map">
        <div id="map"></div>
      </div>
    </main>
    <div id="templates">
      <script type="text/template" data-name="all"><% _.each(routes, r => { %>
  <a class="route-list__item" href="./04.php?id=<%= r.id %>&type=<%= r.type %>&name=<%= r.name %>&route=<%= encodeURIComponent(r.route) %>">
    <div class="route-list__button">
      <button class="btn-route btn-route--<%= r.type %>">№<%= r.name %></button>
    </div>
    <div class="route-list__route"><%= r.route %></div>
    <div class="route-list__time"><% if (r.time) { %><%= r.time %> мин<% } %></div>
  </a>
<% }); %>

      </script>
      <script type="text/template" data-name="list"><div class="tabs js-tabs">
  <div class="l-wrapper">
    <div class="tabs__buttons">
      <% _.each(temp, (item, key) => { %>
        <% if (item.list.length) { %>
          <div class="tabs__button js-tab js-ymaps-route <% if (key === 0) { %><%= 'b-active' %><% } %>" data-id="<%= key %>" data-from="test<%= key %>">
            <%= item.distance %>, <%= item.duration %>
          </div>
        <% } %>
      <% }); %>
    </div>
    <% _.each(temp, (item, key) => { %>
      <% if (item.list.length) { %>
        <div class="tabs__detail" data-to="test<%= key %>" <% if (key !== 0) { %>hidden<% } %>>
          <ul class="tabs__list">
            <% _.each(item.list, itemlist => { %>
              <li class="tabs__item">
                <%= itemlist %>
              </li>
            <% }); %>
          </ul>
        </div>
      <% } %>
    <% }); %>
  </div>
</div>

      </script>
      <script type="text/template" data-name="short"><div class="route-short__wrapper">
<% for (let i = 0; i < shortCount; i++) { %>
<% const r = routes[i]; %>
  <a class="route-short__item" href="./04.php?id=<%= r.id %>&type=<%= r.type %>&name=<%= r.name %>&route=<%= encodeURIComponent(r.route) %>">
    <div class="route-short__button">
      <button class="btn-route btn-route--short btn-route--<%= r.type %>">№<%= r.name %></button>
      <div class="route-short__time"><%= r.time %> мин</div>
    </div>
  </a>
<% } %>
</div>

      </script>
      <script type="text/template" data-name="empty"><div class="empty">
  <div class="empty__icon"></div>
  <div class="empty__text">общественный транспорт работает<br>с 5:30 до 23:30. Возвращайтесь утром!</div>
</div>

      </script>
      <script type="text/template" data-name="marker"><div class="ll-marker ll-marker--<%=type%>">
  <div class="ll-marker__img js-marker-azimuth" data-id="<%=id%>" style="transform: rotate(<%=azimuth%>deg);">
    <svg viewBox="0 0 116 167">
      <g transform="translate(-3043 3887)">
        <circle cx="58" cy="58" r="58" transform="translate(3043 -3720) rotate(-90)"/>
        <path d="M0,0H0a57.721,57.721,0,0,1,9.759,32.21A57.72,57.72,0,0,1,0,64.425L50.762,32.211Z" transform="translate(3068.789 -3836.239) rotate(-90)"/>
      </g>
    </svg>
  </div>
  <div class="ll-marker__number"><span><%=number%></span></div>
</div>

      </script>
    </div>
    <script src="https://api-maps.yandex.ru/2.1/?apikey=042632bb-9b8a-4c32-850c-a29a65a31884&amp;lang=ru_RU"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/leaflet/leaflet.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/leaflet/AnimatedMarker.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/leaflet/Yandex.js"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/vendor.min.js?v=<?=rand()?>"></script>
    <script src="<?=SITE_TEMPLATE_PATH?>/scripts.min.js?v=<?=rand()?>"></script><?php //require_once("../widget/_widget.inc.php"); ?>
  </body>
</html>