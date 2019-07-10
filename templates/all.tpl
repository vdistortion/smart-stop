<header class="header">
  <h1><%= time.hour %><span class="blink">:</span><%= time.minute %></h1>
</header>
<div class="transport">
  <div class="wrapper">
    <table>
      <tbody>
        <% _.each(routes, (r, key) => { %>
          <tr>
            <th colspan="3">
              <h2 class="transport__title <%= key %>"><%= assoc[key] %></h2>
            </th>
          </tr>
          <% _.each(r, route => { %>
            <tr>
              <% if (api) { %>
                <td>
                  <span class="transport__info time"><% if (route.time) { %><%= route.time %> мин<% } %></span>
                </td>
              <% } %>
              <td>
                <span class="transport__info name">№<%= route.name %></span>
              </td>
              <td>
                <span class="transport__info route"><%= route.route %></span>
              </td>
            </tr>
          <% }); %>
        <% }); %>
      </tbody>
    </table>
  </div>
</div>
