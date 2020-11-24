define(["jquery"], function () {
    // 加载头部模块
    function loadHeader() {
        $(".loadHeader").load("./header.html");
    }
    // 尾部模块加载
    function loadFooter() {
        $(".loadFooter").load("./footer.html");
    }
    // 加载fixedLeft
    function loadFixedLeft() {
        $(".main .main_news .loadFixedLeft").load("./fixedLeft.html");
    }
    // 加载fixedRight
    function loadFixedRight() {
        $(".main .main_news .loadFixedRight").load("./fixedRight.html");
    }

    // banner部分
    function move() {
        var index = 0; // 默认显示的图片下标
        var imgs = null; // 图片
        var btns = null; // 按钮
        var timer = null; // 计时器
        if (!imgs) {
            imgs = $(".main_banner_img").find("img");
        }
        if (!btns) {
            btns = $(".main_banner_btn").find("a");
        }
        // 执行一次动画
        tab();
        // 自动执行动画
        autoMove();

        function autoMove() {
            timer = setInterval(function () {
                index++;
                tab();
            }, 3000);
        }

        // 运动函数
        function tab() {
            if (index > imgs.length - 1) {
                index = 0;
            }
            // 图片和按钮显示设置
            imgs.css("opacity", .2).eq(index).show().siblings().hide().end().stop().animate({
                "opacity": 1
            }, 300);
            btns.removeClass("active").eq(index).addClass("active");
        }

        // 小圆点的点击事件
        $(".main_banner_btn").on("click", "a", function () {
            clearInterval(timer);
            imgs.css("opacity", .2).eq($(this).index()).show().siblings().hide().end().stop().animate({
                "opacity": 1
            }, 300);
            btns.removeClass("active").eq($(this).index()).addClass("active");
            index = $(this).index();
            autoMove();
            return false;
        })

        // 上一张和下一张点击按钮实现
        $(".main_banner .main_banner_perv,.main_banner .main_banner_next").click(function () {
            clearInterval(timer);
            if (this.className == "main_banner_perv") {
                index--;
                if (index < 0) {
                    index = btns.length - 1;
                }
            } else {
                index++;
            }
            tab();
            autoMove();
        })

        // 鼠标的移入移出事件
        $(".main_banner").mouseenter(function () {
            clearInterval(timer);
        })
        $(".main_banner").mouseleave(function () {
            clearInterval(timer);
            autoMove();
        })
    }

    // perv和next按钮的定位位置设定
    function pervNextPosition() {
        var width = (($(window).width() - 1090) / 2) - 60;
        $(".main_banner_perv").css("left", width);
        $(".main_banner_next").css("right", width);
    }

    // 数据加载
    function download() {
        $.ajax({
            url: "../data/index.json",
            success: function (data) {
                // console.log(data);
                var newsArr = data.newItemList;
                // console.log(arr);
                // news 切换数据加载
                for (var i = 0, leni = newsArr.length; i < leni; i++) {
                    $(`<div>
                    <a href="goodsDesc.html?porduct_id=${newsArr[i].id}">
                    <div>
                      <img
                        src="${newsArr[i].listPicUrl}"
                        alt="">
                    </div>
                    <div>
                      <img
                        src="${newsArr[i].scenePicUrl}"
                        alt="">
                    </div>
                    <p>${newsArr[i].name}</p>
                    <em>￥${newsArr[i].retailPrice}</em>
                    </a>
                  </div>`).appendTo(".main .main_news_tab .tab_div");
                }

                // 编辑推荐部分数据加载
                var popularArr = data.indexPopularItemVO.popularItemList;
                // console.log(popularArr);
                for (var i = 0, leni = popularArr.length; i < leni; i++) {
                    $(`<div>
                    <a href="goodsDesc.html?porduct_id=${popularArr[i].id}">
                    <div>
                      <img
                        src="${popularArr[i].showPicUrl}"
                        alt="">
                        </div>
                      <p>${popularArr[i].name}</p>
                      <em>￥${popularArr[i].retailPrice}</em>&nbsp;&nbsp;<del>${popularArr[i].counterPrice ? popularArr[i].counterPrice : popularArr[i].productPlace}</del>
                    </a>
                  </div>`).appendTo(".main_popular_goods .main_popular_goods_width");
                }

                // 热销总榜部分数据加载
                var popularTotalList = data.indexPopularItemVO.popularTotalList;
                // console.log(popularArr);
                for (var i = 0, leni = popularTotalList.length; i < leni; i++) {
                    $(`<div>
                    <a href="goodsDesc.html?porduct_id=${popularTotalList[i].id}">
                    <div>
                      <img
                        src="${popularTotalList[i].showPicUrl}"
                        alt="">
                    </div>
                      <p>${popularTotalList[i].name}</p>
                      <em>￥${popularTotalList[i].retailPrice}</em>&nbsp;&nbsp;<del>${popularTotalList[i].counterPrice ? popularTotalList[i].counterPrice : popularTotalList[i].productPlace}</del>
                    </a>
                  </div>`).appendTo(".main_popular_goods .main_popular_goods_hots");
                }

                // 所有商品加载
                var cateList = data.cateList;
                for (var i = 0, leni = cateList.length; i < leni; i++) {
                    var goods = $(`<div class="main_goods">
                  </div>`);
                    goods.appendTo(".main");
                    var container = $(`<div class="container">
                    <div class="main_news_title clearfix">
                        <a href="#">${cateList[i].name}</a>
                        <a href="#">更多新品 ></a>
                    </div>
                    <div class="main_goods_bigimg">
                    <img
                      src="${cateList[i].bannerUrl}"
                      alt="">
                  </div>
                </div>`);
                    container.appendTo(goods);
                    var container_imgs = $(`<div class="main_goods_imgs clearfix"></div>`);
                    container_imgs.appendTo(container);


                    // 子项商品
                    var cateListChild = cateList[i].itemList;
                    for (var j = 0, lenj = cateListChild.length; j < lenj; j++) {
                        $(`<div>
                        <a href="goodsDesc.html?porduct_id=${cateListChild[j].id}">
                          <div>
                            <img
                              src="${cateListChild[j].showPicUrl}"
                              alt="">
                          </div>
                          <div>
                            <img
                              src="${cateListChild[j].scenePicUrl}"
                              alt="">
                          </div>
                          <p>${cateListChild[j].name}</p>
                          <em>￥${cateListChild[j].retailPrice}</em>
                        </a>
                      </div>`).appendTo(container_imgs);
                    }
                }


                // 底部 tab切换数据加载
                var bottomNav = data.commentList;
                // console.log(bottomNav);
                for (var i = 0, leni = bottomNav.length; i < leni; i++) {
                    var time = getMyDate(bottomNav[i].createTime);
                    $(` <div>
                    <a href="goodsDesc.html?porduct_id=${bottomNav[i].id}">
                      <div>
                        <img
                          src="${bottomNav[i].listPicUrl}"
                          alt="">
                      </div>
                      <div>
                        <span>${bottomNav[i].frontUserName}&nbsp;&nbsp;${time}</span>
                        <p class="clearfix">
                          <strong>${bottomNav[i].name}</strong>
                          <em>￥${bottomNav[i].retailPrice}</em>
                        </p>
                        <b>${bottomNav[i].content}</b>
                      </div>
                    </a>
                  </div>`).appendTo(".bottomNav .bottomNav_news .bottomNav_news_tab .tab_div");
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    }



    //  新品推荐功能
    function newsTab() {
        var index = 0;
        var timer = setInterval(function () {
            index++;
            tab();
        }, 5000)

        function tab() {
            $(".main .main_news_tab").stop().animate({
                "scrollLeft": 1100 * index
            }, 2000);
            if (index >= 1) {
                index = -1;
            }
        }
        // perv和next功能实现
        $(".main .main_news .main_banner_perv,.main .main_news .main_banner_next").click(function () {
            clearInterval(timer);
            if (this.className == "main_banner_perv") {
                index--;
                // console.log(index);
            } else {
                index++;
                // console.log(index);
            }
            tab();
            timer = setInterval(function () {
                index++;
                tab();
            }, 5000)
        })

        // 鼠标移入移出事件
        $(".main .main_news_tab").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                tab();
            }, 5000)
        })
    }

    // 编辑推荐 热销总榜 tab切换效果
    function hotsTab() {
        $(".main_popular .main_news_title").children("p").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(".main_popular_goods").children("div").eq($(this).index() - 1).css("z-index", 10).siblings().css("z-index", 1);
        })
    }

    // 图片缩放函数
    function scaleImg(dom) {
        $(dom).on("mouseenter", "img", function () {
            var width = $(this).parent().width();
            var height = $(this).parent().height();
            $(this).stop().animate({
                "width": width * 1.05,
                "height": height * 1.05
            }, 1000);
        })
        $(dom).on("mouseleave", "img", function () {
            var width = $(this).parent().width();
            var height = $(this).parent().height();
            $(this).stop().animate({
                "width": width,
                "height": height
            }, 1000);
        })
    }



    // 时间格式函数
    function getMyDate(str) {
        var oDate = new Date(str),
            oYear = oDate.getFullYear(),
            oMonth = oDate.getMonth() + 1,
            oDay = oDate.getDate(),
            oHour = oDate.getHours(),
            oMin = oDate.getMinutes(),
            oSen = oDate.getSeconds(),
            oTime = oYear + '-' + getzf(oMonth) + '-' + getzf(oDay) + ' ' + getzf(oHour) + ':' + getzf(oMin) + ':' + getzf(oSen); //最后拼接时间
        return oTime;
    };

    //补0操作

    function getzf(num) {
        if (parseInt(num) < 10) {
            num = '0' + num;
        }
        return num;
    }


    // 底部 tab切换功能实现
    function bottomNav() {
        var index = 0;
        var timer = null;
        var falg = true;

        $(".bottomNav .main_banner_perv").hide();
        autoMove();

        function autoMove() {
            timer = setInterval(function () {
                tab();
            }, 3500)
        }

        function tab() {
            if (index >= 20 - 3) {
                index = 17;
                falg = false;
            }
            if (index <= 0) {
                index = 0;
                falg = true;
            }
            if (falg) {
                index++;
            } else {
                index--;
            }
            if (index == 0) {
                $(".bottomNav .main_banner_perv").hide();
            } else {
                $(".bottomNav .main_banner_perv").show();
            }
            if (index == 17) {
                $(".bottomNav .main_banner_next").hide();
            } else {
                $(".bottomNav .main_banner_next").show();
            }
            $(".bottomNav .bottomNav_news .bottomNav_news_tab").stop().animate({
                "scrollLeft": index * 365
            }, 500);
        }

        $(".bottomNav .bottomNav_news .bottomNav_news_tab").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            clearInterval(timer);
            autoMove();
        })
        $(".bottomNav .main_banner_perv,.bottomNav .main_banner_next").click(function () {
            clearInterval(timer);
            if ($(this).hasClass("main_banner_next")) {
                falg = true;
            } else {
                falg = false;
            }
            tab();
            autoMove();
        })
    }





    return {
        loadHeader: loadHeader,
        loadFooter: loadFooter,
        loadFixedLeft: loadFixedLeft,
        loadFixedRight: loadFixedRight,
        move: move,
        pervNextPosition: pervNextPosition,
        download: download,
        newsTab: newsTab,
        hotsTab: hotsTab,
        scaleImg: scaleImg,
        bottomNav: bottomNav
    }
})