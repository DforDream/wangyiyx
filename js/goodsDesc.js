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
    goodsDescMain.fangdajing();
})