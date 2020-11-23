define(["jquery"], function () {
    function loadHeader() {
        $(".loadHeader").load("./header.html");
    }


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

        $(".main_banner_perv,.main_banner_next").click(function () {
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

    





    return {
        loadHeader: loadHeader,
        move: move,
        pervNextPosition: pervNextPosition
    }
})