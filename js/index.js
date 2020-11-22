require.config({
    paths: {
      "jquery": "jquery-1.8.3.min",
      "indexMain": "indexMain"
    }
  })
  
  require(["indexMain"], function (indexMain) {
      indexMain.loadHeader();
      indexMain.move();
      indexMain.pervNextPosition();
  })