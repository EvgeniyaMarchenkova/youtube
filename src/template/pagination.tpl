<% if (numberOfPage != currentPage) { %>
<span><a href = '#' data-page-id="<%- numberOfPage %>"><%- numberOfPage %></a></span>
<% } else { %>
<span><%- numberOfPage %></span>
<% } %>
