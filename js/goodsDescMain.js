define(["jquery"], function ($) {
    function download() {
        $.ajax({
            url: "../data/goodsDesc.json",
            success: function (data) {
                var id = getId();
                var arr = data.data;
                for (var i = 0, leni = arr.length; i < leni; i++){
                    if (arr[i].id == id) {
                        $(`<img src="${arr[i].url}" alt="">`).appendTo(".main_fangdajing_img div:first-child");
                        $(`<img src="${arr[i].url}" alt="">`).appendTo(".main_fangdajing_bigimg");
                        $(`<h2>${arr[i].name}<span>${arr[i].highPraiseRate}%</span></h2>
                        <em>${arr[i].title}<span>好评率 ></span></em>
                        <div>
                            <h3>新品限时购<span>距离优惠结束还有 1天15时22分</span></h3>
                            <p><span>活动价</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>￥${arr[i].nowPrice}</strong><del>￥${arr[i].totalPrice}</del></p>
                            <p></p>
                            <p><span>促销&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>全场换购 低至3折超值换购</strong></p>
                            <p><span>购物返</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>最高返3积分❼</strong></p>
                            <p><span>限制&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>特价商品不可与优惠券叠加使用</strong></p>
                            <p><span>邮费&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>满99元免邮</strong></p>
                            <p><span>配送&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>至请选择地址</strong></p>
                            <p><span>服务&nbsp;&nbsp;</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>.网易自营品牌 .不支持无忧退换 .不可用券
                                    .国内部分地区不可配送</strong></p>
                        </div>`).prependTo(".main_fangdajing_title");
                        var imgs = arr[i].imgs;
                        for (var j = 0, lenj = imgs.length; j < lenj; j++){
                            $(`<img src="${imgs[j].url}" alt="">`).appendTo(".main_fangdajing_img div:last-child");
                        }
                    }
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    }

    // 放大镜功能实现
    function fangdajing() {
        $(".main .main_fangdajing_img").children("div:first-child").mouseenter(function (e) {
            var _this = this;
            var width = $(this).width() - $(this).children("p").width() - 10;
            var height = $(this).height() - $(this).children("p").height();
            $(this).children("p").show();
            $(".main .main_fangdajing_bigimg").show();
            var toleft = e.clientX - e.offsetX;
            var totop = e.clientY - e.offsetY;

            $(document).scroll(function () {
                if ($(document).scrollTop() > 0) {
                    totop = 207 - $(document).scrollTop();
                }
            })
            
            $(document).mousemove(function (e) {
                var left = e.clientX - toleft - 115;
                var top = e.clientY - totop - 115;
                if (left <= 0) {
                    left = 0;
                }
                if (left >= 200) {
                    left = 200;
                }
                if (top <= 0) {
                    top = 0;
                }
                if (top >= 200) {
                    top = 200;
                }
                $(_this).children("p").css({
                    left: left,
                    top: top
                })
                var moveWidth = left / width;
                var moveHeight = top / height;
                $(".main .main_fangdajing_bigimg").children("img").css({
                    left : -430 * moveWidth,
                    top : -430 * moveHeight
                })
            })
        }).mouseleave(function () {
            $(this).children("p").hide();
            $(".main .main_fangdajing_bigimg").hide();
        });  
        $(".main .main_fangdajing_img").children("div:last-child").on("mouseenter", "img", function () {
            $(".main .main_fangdajing_img").children("div:first-child").children("img").attr("src", this.src);
            $(".main .main_fangdajing_bigimg").children("img").attr("src", this.src);
        })
    }

    function getId() {
        var str = location.search.slice(1);
        var arr = str.split("&");
        for (var i = 0, leni = arr.length; i < leni; i++){
            if (arr[i].indexOf("porduct_id=") != -1) {
                var newArr = arr[i].split("=");
                return newArr[1];
            }
        }
    }

    // + - 加减效果实现
    function spanClick() {
        var value = parseInt($(".main_fangdajing_title .ipt").val());
        $(".main_fangdajing_title .ipt").blur(function () {
            value = parseInt($(".main_fangdajing_title .ipt").val());
        })
        $(".main_fangdajing_title .add,.main_fangdajing_title .reduce").click(function () {
            if (this.className == "add") {
                value++;
            } else {
                value--;
                if (value <= 1) {
                    value = 1;
                }
            }
            $(".main_fangdajing_title .ipt").val(value);
        })
    }



    return {
        fangdajing: fangdajing,
        download: download,
        spanClick: spanClick
    }

})