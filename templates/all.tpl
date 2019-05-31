<h5><%= time.hour %><span class="blink">:</span><%= time.minute %></h5>
<% _.each(routes, (r, key) => { %>
  <ul class="collection">
    <% _.each(r, route => { %>
      <li class="collection-item">
        <div class="urban">
          <img src="./i/<%= key %>.png" alt="<%= assoc[key] %>">
          <b>№<%= route.name %></b> <%= route.route.split('-').join('&#x2014;') %>
          <% if(route.time){ %> <span class="coral">(через <%= route.time %>)</span><% } %>
        </div>
      </li>
    <% }); %>
  </ul>
<% }); %>
