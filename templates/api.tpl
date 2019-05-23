<h5>Остановка <%= point %></h5>
<p><%= date %> - <%= time %> (обновлено: <%= update %>)</p>
<ul class="collection">
  <% _.each(list, item => { %>
    <li class="collection-item">
      <%= item.type %> №<%= item.name %> через <%= item.time %>
    </li>
  <% }); %>
</ul>
