document.addEventListener("DOMContentLoaded", function() {

    var elems = document.querySelectorAll(".sidenav");
    M.Sidenav.init(elems);
    loadNav();
    function loadNav() {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4) {
                if (this.status != 200) return;
                document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
                    elm.innerHTML = xhttp.responseText;
                });
                document.querySelectorAll(".topnav a, .sidenav a").forEach(function(elm) {
                    elm.addEventListener("click", function(event) {
                        var sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    })
                });
            }
        };
        xhttp.open("GET", "nav.html", true);
        xhttp.send();
    }
    
    var page = window.location.hash.substr(1);
    if (page == "") page = "klasemen";
    loadPage(page);

    function loadPage(page) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            var content = document.querySelector("#body-content");
            if(page == "klasemen") {
              const script = document.createElement("script"), text = document.createTextNode("getArticles();");
              script.appendChild(text);
              document.body.appendChild(script);
            } else if (page == "team") {
              const script = document.createElement("script"), text = document.createTextNode("getTeams();");
              script.appendChild(text);
              document.body.appendChild(script);
            } else if (page == "myteam") {
              const script = document.createElement("script"), text = document.createTextNode("getSavedTeams();");
              script.appendChild(text);
              document.body.appendChild(script);
            }
            if (this.status == 200) {
              content.innerHTML = xhttp.responseText;
            } else if (this.status == 404) {
              content.innerHTML = "<p>Page not found</p>";
            } else {
              content.innerHTML = "<p>Page can not be accessed  </p>";
            }
          }
        };
        xhttp.open("GET", "/pages/" + page + ".html", true);
        xhttp.send();
      }
});



