require.config({
    paths: {
        "jquery": "jquery-1.8.3.min",
        "indexMain": "indexMain",
        "goodsDescMain": "goodsDescMain"
    }
})

require(["indexMain","goodsDescMain"], function (indexMain,goodsDescMain) {
    indexMain.loadHeader(); // 加载头部模块
    indexMain.loadFooter(); // 尾部模块加载
    goodsDescMain.fangdajing();  // 放大镜效果实现
    goodsDescMain.download(); // 商品详细数据加载
    goodsDescMain.spanClick(); // 商品点击+-效果实现
})