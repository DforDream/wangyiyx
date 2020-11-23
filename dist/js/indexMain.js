define(["jquery"], function () {
    // 加载头部
    function loadHeader() {
        $(".loadHeader").load("./header.html");
    }

    // banner部分
    function move() {
        var index = 0;
        var imgs = null;
        var btns = null;
        var timer = null;
        if (!imgs) {
            imgs = $(".main_banner_img").find("img");
        }
        if (!btns) {
            btns = $(".main_banner_btn").find("a");
        }
        tab();
        autoMove();
        function autoMove(){
            timer = setInterval(function () {
                index++;
                tab();
            }, 3000);
        }
        
        
        function tab() {
            if (index > imgs.length - 1) {
                index = 0;
            }
            imgs.css("opacity", .2).eq(index).show().siblings().hide().end().animate({"opacity":1},300);
            btns.removeClass("active").eq(index).addClass("active");
        }

        $(".main_banner_btn").on("click","a",function () {
            clearInterval(timer);
            imgs.css("opacity", .2).eq($(this).index()).show().siblings().hide().end().animate({"opacity":1},300);
            btns.removeClass("active").eq($(this).index()).addClass("active");
            index = $(this).index();
            autoMove();
            return false;
        })

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


        $(".main_banner").mouseenter(function () {
            clearInterval(timer);
        })
        $(".main_banner").mouseleave(function () {
            clearInterval(timer);
            autoMove();
        })
    }


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
                var arr = data.newItemList;
                // console.log(arr);
                // news 切换数据加载
                for (var i = 0, leni = arr.length; i < leni; i++){
                    $(`<div>
                    <div>
                      <img
                        src="${arr[i].listPicUrl}"
                        alt="">
                    </div>
                    <div>
                      <img
                        src="${arr[i].scenePicUrl}"
                        alt="">
                    </div>
                    <p>${arr[i].name}</p>
                    <em>￥${arr[i].retailPrice}</em>
                  </div>`).appendTo(".main_news_tab .tab_div");
                }


            },
            error: function (err) {
                console.log(err);
            }
        })
    }


    //  新品推荐
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

    function fixed() {
        $(window).scroll(function () {
            // console.log($(document).scrollTop());
            var width = (($(window).width() - 1090) / 2) - 140;
            if ($(document).scrollTop() >= 600) {
                $(".main_fixed_right").removeAttr("style").css({
                    "position": "fixed"
                })
                $(".main_fixed_left").removeAttr("style").css({ "left": width,"position": "fixed"});
            } else {
                $(".main_fixed_right,.main_fixed_left").removeAttr("style").css({
                    "position": "absolute"
                })
            }
        })
    }
    





    return {
        loadHeader: loadHeader,
        move: move,
        pervNextPosition: pervNextPosition,
        download: download,
        newsTab: newsTab,
        fixed: fixed
    }
})