define(["jquery"], function () {
    // 加载头部模块
    function loadHeader() {
        $(".loadHeader").load("./header.html");
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
        function autoMove(){
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
            imgs.css("opacity", .2).eq(index).show().siblings().hide().end().animate({"opacity":1},300);
            btns.removeClass("active").eq(index).addClass("active");
        }

        // 小圆点的点击事件
        $(".main_banner_btn").on("click","a",function () {
            clearInterval(timer);
            imgs.css("opacity", .2).eq($(this).index()).show().siblings().hide().end().animate({"opacity":1},300);
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
                for (var i = 0, leni = newsArr.length; i < leni; i++){
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
                  </div>`).appendTo(".main_news_tab .tab_div");
                }

                // 编辑推荐部分数据加载
                var popularArr = data.indexPopularItemVO.popularItemList;
                // console.log(popularArr);
                for (var i = 0, leni = popularArr.length; i < leni; i++){
                    $(`<div>
                    <a href="goodsDesc.html?porduct_id=${popularArr[i].id}">
                      <img
                        src="${popularArr[i].showPicUrl}"
                        alt="">
                      <p>${popularArr[i].name}</p>
                      <em>￥${popularArr[i].retailPrice}</em>&nbsp;&nbsp;<del>${popularArr[i].counterPrice ? popularArr[i].counterPrice : popularArr[i].productPlace}</del>
                    </a>
                  </div>`).appendTo(".main_popular_goods .main_popular_goods_width");
                }

                // 热销总榜部分数据加载
                var popularTotalList = data.indexPopularItemVO.popularTotalList;
                // console.log(popularArr);
                for (var i = 0, leni = popularTotalList.length; i < leni; i++){
                    $(`<div>
                    <a href="goodsDesc.html?porduct_id=${popularTotalList[i].id}">
                      <img
                        src="${popularTotalList[i].showPicUrl}"
                        alt="">
                      <p>${popularTotalList[i].name}</p>
                      <em>￥${popularTotalList[i].retailPrice}</em>&nbsp;&nbsp;<del>${popularTotalList[i].counterPrice ? popularTotalList[i].counterPrice : popularTotalList[i].productPlace}</del>
                    </a>
                  </div>`).appendTo(".main_popular_goods .main_popular_goods_hots");
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
        },5000)
        function tab() {
            $(".main_news_tab").animate({ "scrollLeft": 1100 * index }, 2000);
            if (index >= 1) {
                index = -1;
            }
        }
        // perv和next功能实现
        $(".main_news .main_banner_perv,.main_news .main_banner_next").click(function () {
            clearInterval(timer);
            if (this.className == "main_banner_perv") {
                index--;
                console.log(index);
            } else {
                index++;
                console.log(index);
            }
            tab();
            timer = setInterval(function () {
                index++;
                tab();
            },5000)
        })

        // 鼠标移入移出事件
        $(".main_news_tab").mouseenter(function () {
            clearInterval(timer);
        }).mouseleave(function () {
            clearInterval(timer);
            timer = setInterval(function () {
                index++;
                tab();
            },5000)
        })
    }

    // 左右两个fixed定位实现
    function fixed() {
        $(window).scroll(function () {
            // console.log($(document).scrollTop());
            var width = (($(window).width() - 1090) / 2) - 140;
            if ($(document).scrollTop() >= 600) {
                $(".main_fixed_right").removeAttr("style").css({
                    "position": "fixed"
                });
                $(".main_fixed_right").children("div:last-child").show();
                $(".main_fixed_left").removeAttr("style").css({ "left": width, "position": "fixed" });
            } else {
                $(".main_fixed_right,.main_fixed_left").removeAttr("style").css({
                    "position": "absolute"
                })
                $(".main_fixed_right").children("div:last-child").hide();
            }
        });
        $(".main_fixed_right").children("div:last-child").click(function () {
            var height = $(document).scrollTop();
            var speed = 30;
            var timer = null;
            clearInterval(timer);
            timer = setInterval(function () {
                height = height - speed;
                $(document).scrollTop(height);
                if ($(document).scrollTop() == 0) {
                    clearInterval(timer);
                }
            }, 15)
        })
    }

    // 编辑推荐 热销总榜 tab切换效果
    function hotsTab() {
        $(".main_popular .main_news_title").children("p").click(function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(".main_popular_goods").children("div").eq($(this).index() - 1).css("z-index", 10).siblings().css("z-index", 1);
        })
    }

    





    return {
        loadHeader: loadHeader,
        move: move,
        pervNextPosition: pervNextPosition,
        download: download,
        newsTab: newsTab,
        fixed: fixed,
        hotsTab: hotsTab
    }
})