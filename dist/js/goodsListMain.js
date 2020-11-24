define(["jquery"], function ($) {
    // nav数据加载及功能实现
    function download() {
        $.ajax({
            url: "../data/goodsList.json",
            success: function (data) {
                var navArr = data.focusList;
                for (var i = 0, leni = navArr.length; i < leni; i++) {
                    $(`<img src="${navArr[i].picUrl}" alt="">`).appendTo(".main .main_tab_imgs");
                    $(`<a href="javascript:;"></a>`).appendTo(".main .main_tab_btns");
                }
                // nav 导航栏功能实现
                var index = 0;
                var timer;
                tab();
                autoMove();
                function autoMove() {
                    timer = setInterval(function () {
                        index++;
                        tab();
                    },3000)
               }
                function tab() {
                    var $imgs = $(".main .main_tab_imgs img");
                    if (index > 2) {
                        index = 0;
                    }
                    $(".main .main_tab_imgs img").eq(index).css("opacity", 1).show().siblings().css("opacity", .2).hide();
                    $(".main  .main_tab_btns a").eq(index).addClass("active").siblings().removeClass("active");
                }
                // 鼠标移入移出效果
                $(".main .main_tab").mouseenter(function () { 
                    clearInterval(timer);
                }).mouseleave(function () {
                    clearInterval(timer);
                    autoMove();
                })

                // 点击小圆点事件
                $(".main  .main_tab_btns").on("click", "a", function () {
                    clearInterval(timer);
                    index = $(this).index();
                    tab();
                    autoMove();
                });

                // 点击左右按钮事件
                $(".main .main_tab_prev,.main .main_tab_next").click(function () {
                    clearInterval(timer);
                    if (this.className == "main_tab_prev") {
                        index--;
                        if (index < 0) {
                            index = 2;
                        }
                    } else {
                        index++;
                    }
                    tab();
                    autoMove();
                })
            },
            error: function (err) {
                console.log(err);
            }
        })

        goodsListDownload();
    }



    function goodsListDownload() {
        $.ajax({
            url: "../data/goodsList.json",
            success: function (data) {
                // console.log(data);
                var goodsListArr = data.categoryItemList[0].itemList;
                // console.log(goodsListArr);
                for (var i = 0, leni = goodsListArr.length; i < leni; i++){
                    $(`<div>
                    <a href="goodsDesc.html?porduct_id=${goodsListArr[i].id}">
                        <div>
                            <img src="${goodsListArr[i].listPicUrl}"
                                alt="">
                        </div>
                        <div>
                            <img src="${goodsListArr[i].scenePicUrl}"
                                alt="">
                        </div>
                        <p>${goodsListArr[i].name}</p>
                        <b><em>${goodsListArr[i].retailPrice}</em> <del>${goodsListArr[i].counterPrice ? goodsListArr[i].counterPrice : ""}</del></b>
                        <span>${goodsListArr[i].simpleDesc}</span>
                    </a>
                </div>`).appendTo(".main .main_goods_imgs");
                }
            },
            error: function (err) {
                console.log(err);
            }
        })
    }






    return {
        download: download,
    }
})