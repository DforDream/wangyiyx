define(['jquery'], function ($) {
    function download() {
        $.ajax({
            url: "./data/top.json",
            success: function (data) {
                // console.log(data);
                var arr = data.data.cateList;
                // console.log(arr);
                for (var i = 0, leni = arr.length; i < leni; i++) {
                    $(`<li class="header_nav_item"><a href="#">${arr[i].name}</a></li>`).appendTo(".header_nav .header_nav_nav ul");
                    var arrChilds = arr[i].subCateGroupList;
                    // console.log(arrChilds);
                    var div = $(`<div class="clearfix header_navTab_div"></div>`);
                    div.appendTo(".header .header_navTab");
                    for (var j = 0, lenj = arrChilds.length; j < lenj; j++) {
                        var ol = $(`<ol class="clearfix"><p>${arrChilds[j].name}</p></ol>`);
                        ol.appendTo(div);
                        var categoryList = arrChilds[j].categoryList;
                        // console.log(categoryList);
                        for (var k = 0, lenk = categoryList.length; k < lenk; k++) {
                            if (k % 8 == 0) {
                                var li = $(`<li></li>`);
                                li.appendTo(ol);
                            }
                            $(`<div>
                            <img src="${categoryList[k].bannerUrl}" alt="">
                                <a href="">${categoryList[k].name}</a>
                          </div>`).appendTo(li);
                        }
                    }
                }

            },
            error: function (err) {
                console.log(err);
            }
        })
    }


    function navTab() {
        $(".header_nav .header_nav_nav ul").on("mouseenter", "li", function () {
            // console.log($(this).index());
            $(this).children("a").addClass("header_nav_active");
            $(this).siblings().children("a").removeClass("header_nav_active");
            var width = $(".header .header_navTab").children(".header_navTab_div").eq($(this).index()).width();
            $(".header .header_navTab").children(".header_navTab_div").eq($(this).index()).show().siblings().hide();
            $(".header .header_navTab").children(".header_navTab_div").eq($(this).index()).css("left", ($(document).width() - width) / 2)
        })
        $(".header").mouseleave(function () { 
            $(".header .header_navTab").children(".header_navTab_div").hide();
            $(".header_nav .header_nav_nav ul").children("li").children("a").removeClass("header_nav_active");
        });
    }




    return {
        download: download,
        navTab: navTab
    }
})