require.config({
  paths: {
    "jquery": "jquery-1.8.3.min",
    "indexMain": "indexMain"
  }
})

require(["indexMain"], function (indexMain) {
  indexMain.loadHeader(); // 加载头部模块
  indexMain.move(); // banner部分
  indexMain.pervNextPosition(); // perv和next按钮定位
  indexMain.download(); // 首页数据加载
  indexMain.newsTab(); // news部分功能
  indexMain.fixed(); // 首页左右fixed定位
  indexMain.hotsTab(); // 编辑推荐 热销总榜 tab切换效果
})