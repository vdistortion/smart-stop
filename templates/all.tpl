<h5><%= time.hour %><span class="blink">:</span><%= time.minute %></h5>
<% _.each(routes, (r, key) => { %>
  <h6 class="urban"><img src="./i/<%= key %>.svg" alt="<%= assoc[key] %>"><%= assoc[key] %></h6>
  <ul class="collection">
    <% _.each(r, route => { %>
      <li class="collection-item">
        <div class="flex-info">
          <div class="flex-info__item time coral"><% if (route.time) { %><%= route.time %> мин.<!-- <span>мин.</span> --><% } %></div>
          <div class="flex-info__item name"><b>№<%= route.name %></b></div>
          <div class="flex-info__item route"><%= route.route %></div>
        </div>
      </li>
    <% }); %>
  </ul>
<% }); %>
