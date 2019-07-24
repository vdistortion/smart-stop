<% _.each(routes, r => { %>
  <a class="route-list__item" href="./04.php?id=<%= r.id %>&type=<%= r.type %>&name=<%= r.name %>&route=<%= encodeURIComponent(r.route) %>">
    <div class="route-list__button">
      <button class="btn-route btn-route--<%= r.type %>">№<%= r.name %></button>
    </div>
    <div class="route-list__route"><%= r.route %></div>
    <div class="route-list__time"><% if (r.time) { %><%= r.time %> мин<% } %></div>
  </a>
<% }); %>
