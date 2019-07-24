<div class="route-short__wrapper">
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
