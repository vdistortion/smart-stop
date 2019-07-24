<div class="tabs js-tabs">
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
