var base_url = "https://api.football-data.org/";
var token = 'e276d6c30d034945922cdb1ea0af8cd1';

function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    return Promise.reject(new Error(response.statustext));
  } else {
    return Promise.resolve(response);
  }
}

function json(response) {
  return response.json();
}

function error(error) {
  console.log("Error : " + error);
}

function getArticles() {
  var id_class = [2001, 2002, 2003]; //, 2021, 2014, 2015
  if ('caches' in window) {
    caches.match(base_url + "v2/competitions/" + 2001 + "/standings", {
      headers: {
        'X-Auth-Token': token
      },
      mode: 'cors'
    }).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          var articlesHTML = "";
          console.log('kena cache tim', data.competition.name);
          articlesHTML += `
                      <div class="card">
                          <div class="card-content">
                          <span class="card-title truncate">${data.competition.name}</span>
                          <p>${data.season.startDate} - ${data.season.endDate}</p>
                          Chache
                          </div>
                      </div>
                      `;
          document.getElementById("content").innerHTML = articlesHTML;
        })
      }
    })
      .catch(error);

    fetch(base_url + "v2/competitions/" + 2001 + "/standings", {
      headers: {
        'X-Auth-Token': token
      },
      mode: 'cors'
    })
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);
        var articlesHTML = ""
        articlesHTML += `
                    <div class="card">
                      <div class="card-content">
                        <span class="card-title truncate">${data.competition.name}</span>
                        <p>${data.season.startDate} - ${data.season.endDate}</p>
                        API
                      </div>
                    </div>
                  `;
        document.getElementById("content").innerHTML = articlesHTML;
      })
      .catch(error);
  }
}

function getTeams() {
  // var id_teams = [524, 86, 851];
  if ('caches' in window) {

    caches.match(base_url + "v2/teams/" + 524, {
      headers: {
        'X-Auth-Token': token
      },
      mode: 'cors'
    }).then(function (response) {
      if (response) {
        response.json().then(function (data) {
          console.log('kena cache tim', data.name);
          var articlesHTML = "";
          articlesHTML += `
                        <div class="card">
                        <div class="card-content">
                          <span class="card-title truncate">${data.name}</span>
                          <img src="${data.crestUrl}">
                          <p>Founded${data.founded} </p>
                          <button onclick='saveToMyTeam(${JSON.stringify(data)})'>Save</button>
                        </div>
                      </div>
                    `;
          document.getElementById("content").innerHTML = articlesHTML;
        })
      }
    })
      .catch(error);

    fetch(base_url + "v2/teams/" + 524, {
      headers: {
        'X-Auth-Token': token
      },
      mode: 'cors'
    })
      .then(status)
      .then(json)
      .then(function (data) {
        console.log(data);
        var articlesHTML = "";
        articlesHTML += `
                    <div class="card">
                      <div class="card-content">
                        <span class="card-title truncate">${data.name}</span>
                        <img src="${data.crestUrl}">
                        <p>Founded${data.founded} </p>
                        <button onclick='saveToMyTeam(${JSON.stringify(data)})'>Save</button>
                      </div>
                    </div>
                  `;
        document.getElementById("content").innerHTML = articlesHTML;
      })
      .catch(error);
  }
}

function getSavedTeams() {
  getAll().then(function (team) {
    var articlesHTML = "";
    team.forEach(function (team) {

      articlesHTML += `
                  <div class="card">
                    <div class="card-content">
                      <span class="card-title truncate">${team.name}</span>
                      <img src="${team.crestUrl}">
                      <p>Founded${team.founded} </p>
                      <button onclick='deleteMyTeam(${team.id})'>Delete</button>
                    </div>
                  </div>
                `;
    });
    document.getElementById("content").innerHTML = articlesHTML;
  });
}

function getProof() {
  console.log('masuk');
}

