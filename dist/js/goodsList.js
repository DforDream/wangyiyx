require.config({
    paths: {
        "jquery": "jquery-1.8.3.min",
        "goodsListMain": "goodsListMain",
        "indexMain": "indexMain"
    }
})

require(["indexMain","goodsListMain"], function (indexMain,goodsListMain) {
    indexMain.loadHeader(); // 加载头部模块
    indexMain.loadFooter(); // 尾部模块加载
    indexMain.loadFixedLeft(); // 加载fixedLeft
    indexMain.loadFixedRight(); // 加载fixedRight
    goodsListMain.download(); // 数据加载
})