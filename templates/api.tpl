<h5><%= hour %><span class="blink">:</span><%= minute %></h5>
<ul class="collection">
  <% _.each(list, item => { %>
    <li class="collection-item">
      <%= item.type %> №<%= item.name %> через <%= item.time %>
    </li>
  <% }); %>
</ul>
