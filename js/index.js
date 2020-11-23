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
  indexMain.scaleImg(".main .main_popular_goods"); // 编辑推荐 热销总榜 图片缩放效果
  indexMain.scaleImg(".bottomNav .bottomNav_news_tab .tab_div");// 底部 tab切换 图片缩放效果
  indexMain.bottomNav(); // 底部 tab切换 功能实现
})