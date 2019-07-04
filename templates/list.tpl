<ul class="tabs">
  <% _.each(temp, (item, key) => { %>
    <% if (item.list.length) { %>
      <li class="tab col s3">
        <a href="#test<%= key %>" class="js-ymaps-route <% if (key === 0) { %><%= 'active' %><% } %>" data-id="<%= key %>">
          <%= item.distance %>, <%= item.duration %>
        </a>
      </li>
    <% } %>
  <% }); %>
</ul>
<% _.each(temp, (item, key) => { %>
  <% if (item.list.length) { %>
    <div id="test<%= key %>">
      <ul class="collection">
        <% _.each(item.list, itemlist => { %>
          <li class="collection-item" style="line-height: 1.2;">
            <%= itemlist %>
          </li>
        <% }); %>
      </ul>
    </div>
  <% } %>
<% }); %>
