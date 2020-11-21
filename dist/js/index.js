// console.log(123);
require.config({
  paths: {
    "jquery": "jquery-1.8.3.min",
    "headerNav": "headerNav"
  }
})

require(["headerNav"], function (headerNav) {
  headerNav.download();
  headerNav.navTab();
})