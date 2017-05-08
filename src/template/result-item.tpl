  <% if (number % 5 == 0 ) { %>
    <div class = 'wrapper-page-slade <% if (number  == 0){ %> swipe__page_center <% } else { %>swipe__page_right <% } %> '
    id = 'list-<%=number/5+1%>'>
  <% } %>
  <div class = 'slide'>
      <a href = '<%- url %>' >
         <div><%- title %></div>
      </a>
      <div class='preview-image'><img src = <%-urlImg%> ></div>
      <div class = "author"><%- author %></div>

  </div>
  <% if (number % 5 == 4) { %>
    </div>
  <% } %>







