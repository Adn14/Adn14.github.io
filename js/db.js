var dbPromised = idb.open("team-collection", 1, function (upgradeDb) {
  var articlesObjectStore = upgradeDb.createObjectStore("team", {
    keyPath: "id"
  });
  articlesObjectStore.createIndex("name", "name", { unique: false });
});

function saveToMyTeam(team) {
  dbPromised
    .then(function (db) {
      var tx = db.transaction("team", "readwrite");
      var store = tx.objectStore("team");
      console.log(team);
      store.put(team);
      return tx.complete;
    })
    .then(function () {
      console.log("Team berhasil di simpan.");
    });
}

function deleteMyTeam(id) {
  console.log(id);
  console.log("delete");
  dbPromised.then(function (db) {
    var tx = db.transaction('team', 'readwrite');
    var store = tx.objectStore('team');
    store.delete(id);
    return tx.complete;
  }).then(function () {
    console.log('Item deleted');
  });
  getSavedTeams();
}

function getAll() {
  return new Promise(function (resolve, reject) {
    dbPromised
      .then(function (db) {
        var tx = db.transaction("team", "readonly");
        var store = tx.objectStore("team");
        return store.getAll();
      })
      .then(function (team) {
        resolve(team);
      });
  });
}
