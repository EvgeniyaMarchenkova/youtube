
  <% if (count % 5 == 0 ) { %>
    <div class = 'wrapper-page-slade' >
  <% } %>
  <div class = 'slide'>
      <a href = '<%- url %>' >
         <div><%- title %></div>
      </a>
      <div class='preview-image'><img src = <%-urlImg%> ></div>
      <div class = "author"><%- author %></div>

  </div>
  <% if (count % 5 == 4) { %>
    </div>
  <% } %>







