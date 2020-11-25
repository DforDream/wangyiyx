require.config({
    paths: {
        "jquery": "jquery-1.8.3.min",
        "indexMain": "indexMain",
        "cartMain": "cartMain"
    }
})

require(["indexMain","cartMain"], function (indexMain,cartMain) {
    indexMain.loadHeader(); // 加载头部模块
    indexMain.loadFooter(); // 尾部模块加载
    cartMain.download();
    // goodsDescMain.addCart(); // 添加购物车
})