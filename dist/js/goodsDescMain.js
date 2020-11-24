define(["jquery"], function ($) {
    

    // 放大镜功能实现
    function fangdajing() {
        $(".main .main_fangdajing_img").children("div:first-child").mouseenter(function () {
            $(this).children("p").show();
            $(".main .main_fangdajing_bigimg").show();
        }).mouseleave(function () {
            $(this).children("p").hide();
            $(".main .main_fangdajing_bigimg").hide();
        });

        $(".main .main_fangdajing_img").children("div:first-child").mousemove(function (e) {
            console.log(e.clientX);
            console.log(e.offsetX);
            $(".main .main_fangdajing_img").children("div:first-child").children("p").css({
                "left": e.offsetX - 115,
                "top": e.offsetY - 115,
            });
        })
    }



    return {
        fangdajing: fangdajing
    }

})